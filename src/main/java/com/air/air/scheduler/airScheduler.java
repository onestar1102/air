package com.air.air.scheduler;

import com.air.air.service.AirService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class airScheduler {

    private final AirService airService;

    @Scheduled(fixedRate = 60000)
    public void scheduleFetch() {
        airService.fetchAirData(); // EntityManager 안전하게 사용 가능
    }
}
