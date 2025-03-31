package com.air.air.repository;

import com.air.air.model.AirInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirRepository extends JpaRepository<AirInfo, Long> {
}
