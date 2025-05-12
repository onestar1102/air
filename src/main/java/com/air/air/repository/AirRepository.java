package com.air.air.repository;

import com.air.air.model.AirInfo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


// AirRepository.java
public interface AirRepository extends JpaRepository<AirInfo, Long> {

    boolean existsByFlightNumberAndDepartureTime(String flightNumber, String departureTime);

    // ✨ 기존 전체 조회 메서드
    List<AirInfo> findByDepartureAndArrivalAndDepartureTimeStartingWith(String departure, String arrival, String date);

    // ✨ 새로 추가할 필터링 메서드
    Page<AirInfo> findByDepartureAndArrivalAndDepartureTimeStartingWithAndEconomyChargeGreaterThan(
            String departure, String arrival, String date, int economyCharge, Pageable pageable //페이지 함수 추가
    );
    //오는편 조회 메서드
    Page<AirInfo> findByDepartureAndArrivalAndDepartureTimeStartingWithAndDepartureTimeGreaterThan(
            String departure,
            String arrival,
            String date,
            String afterDateTime,
            Pageable pageable
    );
}



