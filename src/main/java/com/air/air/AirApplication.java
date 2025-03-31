package com.air.air;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling

    public class AirApplication {
        public static void main(String[] args){
            SpringApplication.run(AirApplication.class, args);
        }
    }


