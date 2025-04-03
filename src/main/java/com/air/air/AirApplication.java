package com.air.air;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMessage;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;

@SpringBootApplication
@EnableScheduling

    public class AirApplication {
        public static void main(String[] args){
            SpringApplication.run(AirApplication.class, args);
        }
    }

    @Bean
public RestTemplate restTemplate(){
    RestTemplate restTemplate = new RestTemplate();
    List<HttpMessageConverter<?>> converters = restTemplate.getMessageConverters();
    for(HttpMessageConverter<?> converter : converters){
        if(converter instanceof StringHttpMessageConverter){
            ((StringHttpMessageConverter) converter).setDefaultCharset(StandardCharsets.UTF_8);
        }
    }
    return restTemplate;
    }



