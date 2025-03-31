package com.air.air.controller;

import com.air.air.model.AirInfo;
import com.air.air.service.AirService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
public class AirController {

    @RestController
    @RequestMapping("/api/air")
    @RequiredArgsConstructor
    public class AirContorller{
        private final AirService airService;

        @GetMapping
        public List<AirInfo> getAir(){
            return airService.getAllAir();
        }
    }

}
