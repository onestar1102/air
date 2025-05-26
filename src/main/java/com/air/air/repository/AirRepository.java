package com.air.air.repository;

import com.air.air.model.AirInfo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

// ✅ AirInfo 엔티티에 대한 DB 접근을 담당하는 JPA Repository 인터페이스
public interface AirRepository extends JpaRepository<AirInfo, Long> {

    /**
     * ✅ 특정 항공편 번호와 출발 시각이 이미 존재하는지 확인
     * - 사용 위치: AirService에서 중복 데이터 방지용
     */
    boolean existsByFlightNumberAndDepartureTime(String flightNumber, String departureTime);

    /**
     * ✅ 출발지 + 도착지 + 출발일 기준 전체 항공편 리스트 조회 (비페이징)
     * - 사용 위치: AirService.getAllAirInfo()
     * - date 형식: "yyyyMMdd"로 시작하는 문자열
     */
    List<AirInfo> findByDepartureAndArrivalAndDepartureTimeStartingWith(
            String departure, String arrival, String date
    );

    /**
     * ✅ 조건 기반 페이징 항공편 검색
     * - 출발지 + 도착지 + 날짜 + 요금 필터 적용
     * - 사용 위치: AirService.searchAirInfo()
     * - date: 출발일(yyyyMMdd), economyCharge > 0 조건 포함
     */
    Page<AirInfo> findByDepartureAndArrivalAndDepartureTimeStartingWithAndEconomyChargeGreaterThan(
            String departure,
            String arrival,
            String date,
            int economyCharge,
            Pageable pageable
    );

    /**
     * ✅ 오는편 항공편 조회 (페이징)
     * - 조건: 출발지 + 도착지 + 날짜 + 특정 시각 이후 출발
     * - 사용 위치: AirService.searchReturnFlights()
     */
    Page<AirInfo> findByDepartureAndArrivalAndDepartureTimeStartingWithAndDepartureTimeGreaterThan(
            String departure,
            String arrival,
            String date,
            String afterDateTime,
            Pageable pageable
    );

    /**
     * ✅ JPQL을 사용한 커스텀 오는편 조회 쿼리
     * - 조건: 출발지/도착지 일치 + 출발시각 ≥ 지정시각 + 이코노미 요금 > 0
     * - 사용 위치: AirService.searchReturnFlights() (보다 정밀한 필터링이 필요할 때)
     */
    @Query("SELECT a FROM AirInfo a WHERE a.departure = :dep AND a.arrival = :arr AND a.departureTime >= :startTime AND a.economyCharge > 0")
    Page<AirInfo> findReturnFlightsAfter(
            @Param("dep") String departure,
            @Param("arr") String arrival,
            @Param("startTime") String startTime,
            Pageable pageable
    );
}
