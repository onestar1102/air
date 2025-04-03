package com.air.air.service;

import com.air.air.model.AirInfo;
import com.air.air.model.AirItem;
import com.air.air.model.AirResponse;
import com.air.air.repository.AirRepository;
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.Unmarshaller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AirService {
    private final AirRepository airRepository;
    private final RestTemplate restTemplate;

    private final String serviceKey = "dKHxaOXQyGKpEWYiH5GZFtJnJv0wotR6Yy3xe%2BMEWUpNxGc1ylBndGDE7LarQ1zgs5m%2FwZDtMS7Qfbcy7Xjsfw%3D%3D";

    private final String[] airports = {
            "NAARKSS", // 김포
            "NAARKPK", // 김해
            "NAARKPC", // 제주
            "NAARKTN", // 대구
            "NAARKJJ", // 광주
            "NAARKCH", // 청주
            "NAARKNW", // 원주
            "NAARKPU", // 울산
            "NAARKNY"  // 양양
    };

    @Scheduled(fixedRate = 60000)
    public void fetchAirData() {
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        for (String depAirport : airports) {
            for (String arrAirport : airports) {
                if (depAirport.equals(arrAirport)) continue; // 출발지와 도착지가 같은 경우는 무시

                try {
                    UriComponentsBuilder builder = UriComponentsBuilder
                            .fromHttpUrl("https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList")
                            .queryParam("serviceKey", serviceKey)
                            .queryParam("depAirportId", depAirport)
                            .queryParam("arrAirportId", arrAirport)
                            .queryParam("depPlandTime", today)
                            .queryParam("pageNo", "1")
                            .queryParam("numOfRows", "100")
                            .queryParam("_type", "xml");

                    String url = builder.build(true).toUriString();

                    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
                    String xmlRaw = response.getBody();
                    String xmlData = new String(xmlRaw.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);

                    JAXBContext context = JAXBContext.newInstance(AirResponse.class);
                    Unmarshaller unmarshaller = context.createUnmarshaller();
                    ByteArrayInputStream inputStream = new ByteArrayInputStream(xmlData.getBytes(StandardCharsets.UTF_8));
                    AirResponse airResponse = (AirResponse) unmarshaller.unmarshal(inputStream);
                    List<AirItem> itemList = airResponse.getBody().getItems().getItemList();

                    for (AirItem item : itemList) {
                        boolean exists = airRepository
                                .findAll().stream()
                                .anyMatch(existing -> existing.getFlightNumber().equals(item.getAirNumber()) && existing.getDepartureTime().equals(item.getDepartureTime()));

                        if (exists) continue; // 중복된 항공편은 저장하지 않음

                        AirInfo info = new AirInfo();
                        info.setFlightNumber(item.getAirNumber());
                        info.setDeparture(item.getDeparture());
                        info.setArrival(item.getArrival());
                        info.setDepartureTime(item.getDepartureTime());
                        info.setArrivalTime(item.getArrivalTime());
                        info.setSeatsAvailable(100); // 좌석 수는 임의로 지정
                        airRepository.save(info);
                    }

                } catch (Exception e) {
                    System.out.println(depAirport + "→" + arrAirport + " 노선 수집 중 에러 발생:");
                    e.printStackTrace();
                }
            }
        }
    }

    public List<AirInfo> getAllAir() {
        return airRepository.findAll();
    }
}
