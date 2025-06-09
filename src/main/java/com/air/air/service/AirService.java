package com.air.air.service;

import com.air.air.model.AirInfo;
import com.air.air.model.AirItem;
import com.air.air.model.AirResponse;
import com.air.air.repository.AirRepository;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.Unmarshaller;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * ✅ 항공편 데이터를 외부 API로부터 수집, 변환, 저장, 검색, 정리하는 핵심 비즈니스 계층
 */
@Service
@RequiredArgsConstructor
public class AirService {

    private final AirRepository airRepository; // ✅ DB 저장/조회용 JPA 레포지토리
    private final RestTemplate restTemplate;   // ✅ API 호출용 HTTP 클라이언트
    private final JdbcTemplate jdbcTemplate;   // ✅ 직접 SQL 실행용 도구 (데이터 정리 시 사용)

    private final String serviceKey = "no2XhuWFJAc1%2F%2Fa9X0T%2F76NllkASaSKNyw%2BkM5pBP2K7kZsqcb1GfhAuin0%2Ft4gVvqD9T8o%2FKU6f6rVcYNMoAw%3D%3D" ; // ✅ 공공 API 인증키 (URL-encoded)

    private final String[] airports = {
            "NAARKSS", "NAARKPK", "NAARKPC", "NAARKTN", "NAARKJJ",
            "NAARKCH", "NAARKNW", "NAARKPU", "NAARKNY"
    };

    private final Map<String, Integer> emptyRouteCount = new HashMap<>();
    // ✅ 노선별로 연속 NO_DATA 발생 횟수를 저장 (3회 이상 발생 시 스킵 처리)

    /**
     * ✅ 항공편 데이터 수집 스케줄러 (매 1분마다 실행)
     * - 오늘부터 7일간의 데이터를 수집
     * - 출발/도착 공항 조합별로 루프
     * - API 호출 → XML 파싱 → 중복 체크 → DB 저장
     * - 3회 연속 NO_DATA 발생 시 해당 루트는 스킵
     */
    @Scheduled(fixedRate = 60000)
    public void fetchAirData() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "*/*");
        headers.set("User-Agent", "Mozilla/5.0");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        for (int d = 0; d < 7; d++) {
            LocalDate targetDate = LocalDate.now().plusDays(d);
            String apiDate = targetDate.format(DateTimeFormatter.ofPattern("yyyyMMdd")); // API 요청용
            String displayDate = targetDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")); // 콘솔용

            for (String depAirport : airports) {
                for (String arrAirport : airports) {
                    if (depAirport.equals(arrAirport)) continue;

                    String routeKey = depAirport + "→" + arrAirport + "@" + apiDate;
                    if (emptyRouteCount.getOrDefault(routeKey, 0) >= 3) {
                        System.out.println(routeKey + " : 3번 연속 비어있어 요청 스킵");
                        continue;
                    }

                    try {
                        // ✅ 외부 항공 API URL 생성
                        String url = "https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList"
                                + "?serviceKey=" + serviceKey
                                + "&depAirportId=" + depAirport
                                + "&arrAirportId=" + arrAirport
                                + "&depPlandTime=" + apiDate
                                + "&pageNo=1"
                                + "&numOfRows=100"
                                + "&_type=xml";

                        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

                        // ✅ 문자 인코딩 처리
                        String xmlRaw = response.getBody();
                        String xmlData = new String(xmlRaw.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);

                        // ✅ 오류 응답 또는 빈 응답 검사
//                       if (xmlData.contains("<OpenAPI_ServiceResponse>") || !xmlData.contains("<response>")) {
//                           System.out.println(routeKey + " : API 오류 또는 잘못된 응답");
//                           continue;
//                       }

                        if (xmlData.contains("<OpenAPI_ServiceResponse>")) {
                            System.out.println(routeKey + " : 공공 API 인증 또는 요청 오류 (OpenAPI_ServiceResponse 포함됨)");
                            System.out.println("🔴 응답 원문:\n" + xmlData);
                            continue;
                        }

                        if (xmlData.contains("<resultCode>03</resultCode>")) {
                            System.out.println(routeKey + ": NO_DATA (3회 카운트)");
                            emptyRouteCount.put(routeKey, emptyRouteCount.getOrDefault(routeKey, 0) + 1);
                            continue;
                        }

                        // ✅ JAXB로 XML → Java 객체 변환
                        JAXBContext context = JAXBContext.newInstance(AirResponse.class);
                        Unmarshaller unmarshaller = context.createUnmarshaller();
                        ByteArrayInputStream inputStream = new ByteArrayInputStream(xmlData.getBytes(StandardCharsets.UTF_8));
                        AirResponse airResponse = (AirResponse) unmarshaller.unmarshal(inputStream);

                        // ✅ 비정상 파싱 검사
                        if (airResponse.getBody() == null || airResponse.getBody().getItems() == null || airResponse.getBody().getItems().getItemList() == null) {
                            System.out.println(routeKey + ": items 비어있음");
                            emptyRouteCount.put(routeKey, emptyRouteCount.getOrDefault(routeKey, 0) + 1);
                            continue;
                        }

                        List<AirItem> itemList = airResponse.getBody().getItems().getItemList();
                        if (itemList.isEmpty()) {
                            System.out.println(routeKey + " : itemList 비어있음");
                            emptyRouteCount.put(routeKey, emptyRouteCount.getOrDefault(routeKey, 0) + 1);
                            continue;
                        }

                        // ✅ 데이터 존재 → 카운트 초기화
                        emptyRouteCount.put(routeKey, 0);

                        // ✅ 각 항공편 정보 저장
                        for (AirItem item : itemList) {
                            boolean exists = airRepository.existsByFlightNumberAndDepartureTime(item.getAirNumber(), item.getDepartureTime());
                            if (exists) continue;

                            AirInfo info = new AirInfo();
                            info.setFlightNumber(item.getAirNumber());
                            info.setDeparture(item.getDeparture());
                            info.setArrival(item.getArrival());
                            info.setDepartureTime(item.getDepartureTime());
                            info.setArrivalTime(item.getArrivalTime());
                            info.setSeatsAvailable(100); // 기본 좌석 수 설정
                            info.setAirlineName(item.getAirlineName());
                            info.setEconomyCharge(item.getEconomyCharge() != null ? item.getEconomyCharge() : 0);
                            info.setPrestigeCharge(item.getPrestigeCharge() != null ? item.getPrestigeCharge() : 0);
                            airRepository.save(info);
                        }

                        Thread.sleep(2000); // ✅ 과도한 요청 방지 딜레이

                    } catch (Exception e) {
                        System.out.println(routeKey + " 노선 수집 중 에러 발생:");
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    /**
     * ✅ 항공편 검색 API (기본 편도)
     * 조건: 출발지, 도착지, 날짜 + 요금 0원 이상만
     */
    public Page<AirInfo> searchAirInfo(String departure, String arrival, String date, Pageable pageable) {
        return airRepository.findByDepartureAndArrivalAndDepartureTimeStartingWithAndEconomyChargeGreaterThan(
                departure, arrival, date, 0, pageable
        );
    }

    /**
     * ✅ 항공편 검색 API (오는 편 - 시간 조건 포함)
     * 조건: 출발지, 도착지, 출발시간 > 특정시간
     */
    public Page<AirInfo> searchReturnFlights(String departure, String arrival, String fullDateTime, Pageable pageable) {
        return airRepository.findReturnFlightsAfter(departure, arrival, fullDateTime, pageable);
    }

    /**
     * ✅ 오래된 항공편 데이터 정리 스케줄러
     * 실행 주기: 매 분마다
     * 삭제 조건: created_at < 현재 시각 - 3시간
     */
    @Scheduled(cron = "0 * * * * ?")
    public void cleanUpOldAirInfo() {
        System.out.println("Cleaning up old air_info data...");
        String sql = "DELETE FROM air_info WHERE created_at < NOW() - INTERVAL 3 HOUR";
        int rowsAffected = jdbcTemplate.update(sql);
        System.out.println("삭제된 행 수: " + rowsAffected);
    }

    /**
     * ✅ 항공편 전체 조회 (페이징 지원)
     */
    public Page<AirInfo> getAllAir(Pageable pageable) {
        return airRepository.findAll(pageable);
    }

    /**
     * ✅ 오는 편 항공편 조회 (기본 메서드 사용)
     */
    public Page<AirInfo> getReturnFlights(String departure, String arrival, String date, String afterTime, Pageable pageable) {
        return airRepository.findByDepartureAndArrivalAndDepartureTimeStartingWithAndDepartureTimeGreaterThan(
                departure, arrival, date, date + afterTime, pageable
        );
    }
}
