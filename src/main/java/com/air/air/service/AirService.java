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
import java.nio.charset.StandardCharsets;

import java.io.ByteArrayInputStream;
import java.io.StringReader;
import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AirService {
    private final AirRepository airRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Scheduled(fixedRate = 60000)
    public void fetchAirData() {
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String serviceKey = "dKHxaOXQyGKpEWYiH5GZFtJnJv0wotR6Yy3xe%2BMEWUpNxGc1ylBndGDE7LarQ1zgs5m%2FwZDtMS7Qfbcy7Xjsfw%3D%3D";

        URI uri = UriComponentsBuilder
                .fromUriString("https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList")
                .queryParam("serviceKey", serviceKey)
                .queryParam("depAirportId", "NAARKJJ")
                .queryParam("arrAirportId", "NAARKPC")
                .queryParam("depPlandTime", today)
                .queryParam("pageNo", "1")
                .queryParam("numOfRows", "100")
                .queryParam("_type", "xml")
                .build(true)
                .toUri();

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
            String xmlData = response.getBody();

            System.out.println("API응답 XML 시작");
            System.out.println(xmlData);
            System.out.println("API응답 XML 끝");

            JAXBContext context = JAXBContext.newInstance(AirResponse.class);
            Unmarshaller unmarshaller = context.createUnmarshaller();
            ByteArrayInputStream inputStream = new ByteArrayInputStream(xmlData.getBytes(StandardCharsets.UTF_8));
            AirResponse airResponse = (AirResponse) unmarshaller.unmarshal(inputStream);
            List<AirItem> itemList = airResponse.getBody().getItems().getItemList();

            for (AirItem item : itemList) {
                boolean exists = !airRepository
                        .findByFlightNumberAndDepartureTime(item.getAirNumber(), item.getDepartureTime())
                        .isEmpty();

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

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<AirInfo> getAllAir() {
        return airRepository.findAll();
    }
}
