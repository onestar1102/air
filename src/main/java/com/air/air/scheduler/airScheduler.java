package com.air.air.scheduler;

import com.air.air.service.AirService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
// ✅ 이 클래스는 스프링에서 관리되는 컴포넌트(Bean)로 자동 등록됨
@RequiredArgsConstructor
// ✅ 생성자 주입 자동 생성 (final 필드에 대해 생성자 자동 생성)
public class airScheduler {

    private final AirService airService; // ✅ 항공 데이터 수집 로직이 정의된 서비스 계층 주입

    /**
     * ✅ 항공편 데이터 자동 수집 스케줄러
     * - 실행 주기: 매 60초마다 한 번 실행 (fixedRate = 60000ms)
     * - 호출 메서드: AirService.fetchAirData()
     * - 기능 요약:
     *   - 외부 공공항공 API 호출
     *   - XML 파싱 → AirInfo 변환
     *   - DB에 저장 (중복 검사 포함)
     */
    @Scheduled(fixedRate = 60000)
    public void scheduleFetch() {
        airService.fetchAirData();
        // ✅ AirService에서 공공데이터 API를 호출해 항공편 데이터를 가져오고 저장
    }
}
