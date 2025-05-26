package com.air.air.controller;

import com.air.air.model.AirInfo;
import com.air.air.service.AirService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // ✅ 이 클래스는 JSON 형태의 응답을 반환하는 REST API 컨트롤러임을 명시
@RequestMapping("/api/air") // ✅ "/api/air"로 시작하는 모든 요청을 이 컨트롤러가 처리함
@RequiredArgsConstructor // ✅ Lombok: 생성자 주입 자동 생성 (final 필드 대상)
public class AirController {

    private final AirService airService; // ✅ 비즈니스 로직을 처리하는 서비스 객체 (자동 주입됨)

    /**
     * ✅ 항공편 목록 검색 API
     * - 요청 방식: GET
     * - 요청 주소: /api/air
     * - 파라미터: 출발지, 도착지, 날짜 (선택적), 페이징 정보 포함
     * - 기능:
     *   1. 출발지/도착지/날짜가 모두 입력되었을 경우: 조건에 맞는 항공편 검색
     *   2. 아무 조건도 없을 경우: 전체 항공편 목록 페이징 조회
     * - 내부 호출: airService.searchAirInfo 또는 airService.getAllAir
     */
    @GetMapping
    public Page<AirInfo> searchAirInfo(
            @RequestParam(required = false) String departure, // 출발지 (예: ICN)
            @RequestParam(required = false) String arrival,   // 도착지 (예: PUS)
            @RequestParam(required = false) String date,      // 날짜 (예: 20250526)
            @PageableDefault(size = 10) Pageable pageable     // ✅ 페이지 크기 기본 10개
    ) {
        if (departure != null && arrival != null && date != null) {
            // ✅ 검색 조건이 모두 있을 경우: 조건 기반 검색 수행
            return airService.searchAirInfo(departure, arrival, date, pageable);
        } else {
            // ✅ 조건이 없을 경우: 전체 항공편 리스트 반환
            return airService.getAllAir(pageable);
        }
    }

    /**
     * ✅ 돌아오는 항공편 조회 API (오는 편 전용)
     * - 요청 방식: GET
     * - 요청 주소: /api/air/return
     * - 파라미터:
     *   - departure: 출발지
     *   - arrival: 도착지
     *   - date: 날짜 (yyyyMMdd 형식)
     *   - afterTime: 시간 (HHmm 형식)
     * - 기능:
     *   - 'date + afterTime'을 합쳐서 "yyyyMMddHHmm" 형식의 전체 시각을 만들고,
     *     해당 시간 이후의 돌아오는 항공편들을 페이징 조회
     * - 내부 호출: airService.searchReturnFlights()
     */
    @GetMapping("/return")
    public Page<AirInfo> getReturnFlights(
            @RequestParam String departure,
            @RequestParam String arrival,
            @RequestParam String date,
            @RequestParam String afterTime, // ex: "1500"
            @PageableDefault(size = 10) Pageable pageable
    ) {
        String fullDateTime = date + afterTime; // ✅ ex: "202505261500" (날짜 + 시각)
        return airService.searchReturnFlights(departure, arrival, fullDateTime, pageable);
    }
}
