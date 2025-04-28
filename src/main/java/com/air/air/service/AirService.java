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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AirService {
    private final AirRepository airRepository;
    private final RestTemplate restTemplate;

    private final String serviceKey = "SdXDk0SWv%2BcJRcaJCPZvfkjA94caZ1xaaAH3PMifIERnFkhpg0gSemIGu1K7aANcTf%2B%2FBRZYfx8hQRg2EjUyrg%3D%3D";

    private final String[] airports = {
            "NAARKSS", "NAARKPK", "NAARKPC", "NAARKTN", "NAARKJJ",
            "NAARKCH", "NAARKNW", "NAARKPU", "NAARKNY"
    };

    private final Map<String, Integer> emptyRouteCount = new HashMap<>();

    private final JdbcTemplate jdbcTemplate;

    @Scheduled(fixedRate = 60000)
    public void fetchAirData() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "*/*");
        headers.set("User-Agent", "Mozilla/5.0");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        for (int d = 0; d < 7; d++) {   // ✨ 오늘부터 7일 동안
            LocalDate targetDate = LocalDate.now().plusDays(d);

            // API 요청용 (yyyyMMdd)
            String apiDate = targetDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            // 콘솔 출력용 (yyyy-MM-dd)
            String displayDate = targetDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

            for (String depAirport : airports) {
                for (String arrAirport : airports) {
                    if (depAirport.equals(arrAirport)) continue;

                    String routeKey = depAirport + "→" + arrAirport + "@" + apiDate;

                    if (emptyRouteCount.getOrDefault(routeKey, 0) >= 3) {
                        System.out.println(routeKey + " : 3번 연속 비어있어 요청 스킵");
                        continue;
                    }

                    try {
                        String url = "https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList"
                                + "?serviceKey=" + serviceKey
                                + "&depAirportId=" + depAirport
                                + "&arrAirportId=" + arrAirport
                                + "&depPlandTime=" + apiDate    // ✨ 반드시 apiDate 사용
                                + "&pageNo=1"
                                + "&numOfRows=100"
                                + "&_type=xml";

                        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

                        String xmlRaw = response.getBody();
                        String xmlData = new String(xmlRaw.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);

                        System.out.println("[" + displayDate + "] " + depAirport + " → " + arrAirport);
                        System.out.println(xmlData);

                        if (xmlData.contains("<OpenAPI_ServiceResponse>")) {
                            System.out.println(routeKey + " API 인증키 오류 또는 서비스 오류 발생");
                            System.out.println(xmlData);
                            continue;
                        }
                        if (!xmlData.contains("<response>")) {
                            System.out.println(routeKey + " : 정상 응답 아님, 건너뜀");
                            continue;
                        }
                        if (xmlData.contains("<resultCode>03</resultCode>")) {
                            System.out.println(routeKey + ": 데이터 없음 (NO_DATA)");
                            emptyRouteCount.put(routeKey, emptyRouteCount.getOrDefault(routeKey, 0) + 1);
                            continue;
                        }

                        JAXBContext context = JAXBContext.newInstance(AirResponse.class);
                        Unmarshaller unmarshaller = context.createUnmarshaller();
                        ByteArrayInputStream inputStream = new ByteArrayInputStream(xmlData.getBytes(StandardCharsets.UTF_8));
                        AirResponse airResponse = (AirResponse) unmarshaller.unmarshal(inputStream);

                        if (airResponse.getBody() == null || airResponse.getBody().getItems() == null || airResponse.getBody().getItems().getItemList() == null) {
                            System.out.println(routeKey + ": 데이터 없음 (items 비어있음)");
                            emptyRouteCount.put(routeKey, emptyRouteCount.getOrDefault(routeKey, 0) + 1);
                            continue;
                        }

                        List<AirItem> itemList = airResponse.getBody().getItems().getItemList();
                        if (itemList.isEmpty()) {
                            System.out.println(routeKey + " : 가져온 데이터 없음 (itemList 비어있음)");
                            emptyRouteCount.put(routeKey, emptyRouteCount.getOrDefault(routeKey, 0) + 1);
                            continue;
                        }

                        emptyRouteCount.put(routeKey, 0);

                        for (AirItem item : itemList) {
                            boolean exists = airRepository.existsByFlightNumberAndDepartureTime(item.getAirNumber(), item.getDepartureTime());
                            if (exists) continue;

                            AirInfo info = new AirInfo();
                            info.setFlightNumber(item.getAirNumber());
                            info.setDeparture(item.getDeparture());
                            info.setArrival(item.getArrival());
                            info.setDepartureTime(item.getDepartureTime());
                            info.setArrivalTime(item.getArrivalTime());
                            info.setSeatsAvailable(100);
                            info.setAirlineName(item.getAirlineName());
                            info.setEconomyCharge(item.getEconomyCharge() != null ? item.getEconomyCharge() : 0);
                            info.setPrestigeCharge(item.getPrestigeCharge() != null ? item.getPrestigeCharge() : 0);
                            airRepository.save(info);
                        }

                        Thread.sleep(2000);

                    } catch (Exception e) {
                        System.out.println(routeKey + " 노선 수집 중 에러 발생:");
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    // AirService.java - 가격이 0원인 데이터들 예외처리
    public Page<AirInfo> searchAirInfo(String departure, String arrival, String date, Pageable pageable) {
        return airRepository.findByDepartureAndArrivalAndDepartureTimeStartingWithAndEconomyChargeGreaterThan(
                departure, arrival, date, 0, pageable);

    }

    @Scheduled(cron = "0 * * * * ?")  // 매 분마다 실행
    public void cleanUpOldAirInfo() {
        System.out.println("Cleaning up old air_info data (created_at 기준)...");

        String sql = "DELETE FROM air_info " +
                "WHERE created_at < NOW() - INTERVAL 3 HOUR";

        int rowsAffected = jdbcTemplate.update(sql);

        System.out.println("삭제된 행 수: " + rowsAffected);
    }
    //AirService.java 에서 전체 데이터 반환
    public Page<AirInfo> getAllAir(Pageable pageable){
        return airRepository.findAll(pageable);
    }



}
