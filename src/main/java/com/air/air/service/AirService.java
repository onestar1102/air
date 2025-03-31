package com.air.air.service;

import com.air.air.model.AirInfo;
import com.air.air.repository.AirRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AirService{
    private final AirRepository airRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    //1분마다 api 호출하기
    @Scheduled(fixedRate = 60000)
    public void fetchAirData(){
        String url = "https://api-url?servicekey=YRSyVp7qo9PuTtrrngsdjtJduhMqPdGiwJXq6sdkQBHGK8TIvM1QAxL4DGD9lidsGNh9OioWkjqGF6u%2FTrnsqA%3D%3D&param=value";
        //응답에 따라 파싱 필요
        //XML -> json 변환 필요

        //예시
        AirInfo info = new AirInfo(
                null, "Ke123", "ICN", "PUS",
                "2025-04-01T08:00", "2025-04-01T09:20", 45
        );

        airRepository.save(info);
    }

    public List<AirInfo> getAllAir() {
        return airRepository.findAll();
    }
}
