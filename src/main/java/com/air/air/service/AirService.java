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

import java.io.StringReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AirService{
    private final AirRepository airRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    //1분마다 api 호출하기
    @Scheduled(fixedRate = 60000)
    public void fetchAirData(){
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")); // 1분마다 오늘 날짜 객체 생성하여 api요구 포맷에 맞게 변환시키는 코드
        String url ="https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList"
                + "?serviceKey=dKHxaOXQyGKpEWYiH5GZFtJnJv0wotR6Yy3xe%2BMEWUpNxGc1ylBndGDE7LarQ1zgs5m%2FwZDtMS7Qfbcy7Xjsfw%3D%3D"
                + "&depAirportId=NAARKJJ"   // 출발: 김포
                + "&arrAirportId=NAARKPC"   // 도착: 제주
                + "&depPlandTime=" + today
                + "&pageNo=1"
                + "&numOfRows=100"
                + "&_type=xml";

        //응답에 따라 파싱 필요
        //XML -> json 변환 필요

        //예시
        try{
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            String xmlData = response.getBody();

            System.out.println("API응답 XML 시작");
            System.out.println(xmlData);
            System.out.println("API응답 XML 끝");

            JAXBContext context = JAXBContext.newInstance(AirResponse.class);
            Unmarshaller unmarshaller = context.createUnmarshaller();
            StringReader reader = new StringReader(xmlData);
            AirResponse airResponse = (AirResponse)  unmarshaller.unmarshal(reader);
            List<AirItem> itemList = airResponse.getBody().getItems().getItemList();

            for (AirItem item : itemList) {
                AirInfo info = new AirInfo(
                        null,
                        item.getAirNumber(),
                        item.getDeparture(),
                        item.getArrival(),
                        item.getDepartureTime(),
                        item.getArrivalTime(),
                        100 // 임의값임 << 좌석 수
                );
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
