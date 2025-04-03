package com.air.air.repository;

import com.air.air.model.AirInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AirRepository extends JpaRepository<AirInfo, Long> {
    List<AirInfo> findByFlightNumberAndDepartureTime(String flightNumber, String departureTime);
}


