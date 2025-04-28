package com.air.air.controller;

import com.air.air.model.AirInfo;
import com.air.air.service.AirService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/air")
@RequiredArgsConstructor
    public class AirController{
        private final AirService airService;

        @GetMapping
        public List<AirInfo> searchAirInfo(
                @RequestParam(required = false) String departure,
                @RequestParam(required = false) String arrival,
                @RequestParam(required = false) String date
        ){
            if (departure != null && arrival != null && date != null){
                return airService.searchAirInfo(departure, arrival, date);
            } else{
                return airService.getAllAir();
            }
        }
}


