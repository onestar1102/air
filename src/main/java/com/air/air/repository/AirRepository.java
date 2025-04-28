package com.air.air.repository;

import com.air.air.model.AirInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


// AirRepository.java
public interface AirRepository extends JpaRepository<AirInfo, Long> {

    boolean existsByFlightNumberAndDepartureTime(String flightNumber, String departureTime);

    // ✨ 기존 전체 조회 메서드
    List<AirInfo> findByDepartureAndArrivalAndDepartureTimeStartingWith(String departure, String arrival, String date);

    // ✨ 새로 추가할 필터링 메서드
    List<AirInfo> findByDepartureAndArrivalAndDepartureTimeStartingWithAndEconomyChargeGreaterThan(
            String departure, String arrival, String date, int economyCharge
    );
}



