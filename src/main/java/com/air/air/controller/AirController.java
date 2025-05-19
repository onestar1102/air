package com.air.air.controller;

import com.air.air.model.AirInfo;
import com.air.air.service.AirService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/air")
@RequiredArgsConstructor
    public class AirController {
    private final AirService airService;

    @GetMapping
    public Page<AirInfo> searchAirInfo(
            @RequestParam(required = false) String departure,
            @RequestParam(required = false) String arrival,
            @RequestParam(required = false) String date,
            @PageableDefault(size = 10) Pageable pageable //페이징 파라미터
    ) {
        if (departure != null && arrival != null && date != null) {
            return airService.searchAirInfo(departure, arrival, date, pageable);
        } else {
            return airService.getAllAir(pageable);
        }
    }

    //오는편 항공편 전용 api
    @GetMapping("/return")
    public Page<AirInfo> getReturnFlights(
            @RequestParam String departure,
            @RequestParam String arrival,
            @RequestParam String date,
            @RequestParam String afterTime,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        String fullDateTime = date + afterTime; // "yyyyMMddHHmm"
        return airService.searchReturnFlights(departure, arrival, fullDateTime, pageable);
    }

}


