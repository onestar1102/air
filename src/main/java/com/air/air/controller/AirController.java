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
        public List<AirInfo> getAir(){
            return airService.getAllAir();
        }
    }


