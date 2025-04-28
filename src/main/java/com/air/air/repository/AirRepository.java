package com.air.air.repository;

import com.air.air.model.AirInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


// AirRepository.java
public interface AirRepository extends JpaRepository<AirInfo, Long> {
    //검색 조건(출발지, 도착지, 날짜)로 항공편 조회하기
    List<AirInfo> findByDepartureAndArrivalAndDepartureTimeStartingWith(String departure, String arrival, String departureDate);
    // 중복체크 - 항공편 번호 + 출발시간
    boolean existsByFlightNumberAndDepartureTime(String flightNumber, String departureTime);
}



