package com.air.air;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

import java.util.TimeZone;

@SpringBootApplication
// ✅ Spring Boot 애플리케이션의 핵심 어노테이션
// - @ComponentScan, @Configuration, @EnableAutoConfiguration을 통합하여
//   컴포넌트 탐색 및 자동 설정 활성화
@EnableScheduling
// ✅ @Scheduled 사용을 위한 스케줄링 기능 활성화
@EnableJpaAuditing
// ✅ JPA 엔티티에서 @CreatedDate 같은 자동 시간 기록 기능 사용 가능하게 함
public class AirApplication {

    public static void main(String[] args) {
        // ✅ 애플리케이션 실행 시 진입점 메서드
        // - 내장 톰캣 서버가 실행되고 모든 스프링 컴포넌트가 로딩됨
        SpringApplication.run(AirApplication.class, args);
    }

    /**
     * ✅ 외부 공공 API 호출을 위한 RestTemplate Bean 등록
     * - Spring에서 주입 받을 수 있도록 Bean으로 등록
     * - RestTemplate 내부 URL 빌더의 인코딩 설정을 '비활성화'해야 항공 API 호출 시 오류를 방지할 수 있음
     */
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();

        // ✅ 공공 데이터 포털 API URL에 포함된 % 인코딩을 방지하기 위해 인코딩 모드 NONE 설정
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory();
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);
        restTemplate.setUriTemplateHandler(factory);

        return restTemplate;
    }

    /**
     * ✅ 서버가 시작되면 JVM 타임존을 Asia/Seoul로 설정
     * - DB @CreatedDate 등에 한국 시간이 적용되도록 보장
     */
    @PostConstruct
    public void started() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        System.out.println("현재 타임존 = " + TimeZone.getDefault().getID());
    }
}
