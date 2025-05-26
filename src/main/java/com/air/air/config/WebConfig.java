package com.air.air.config;

// ✅ Spring 설정 관련 애노테이션 및 MVC 기능 사용을 위한 클래스들 임포트
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // ✅ 이 클래스는 스프링 설정 클래스임을 명시 (스프링 부팅 시 자동 실행)
public class WebConfig implements WebMvcConfigurer {

    /**
     * ✅ CORS 설정을 위한 WebMvcConfigurer Bean 등록
     * - CORS(Cross-Origin Resource Sharing): 다른 도메인(출처)의 프론트엔드가 백엔드 API에 접근할 수 있게 허용하는 설정
     * - 이 메서드는 스프링 컨텍스트가 시작될 때 자동으로 실행되며, 아래 설정이 전역으로 적용됨
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            /**
             * ✅ CORS 정책 등록 메서드
             * - 모든 URL 패턴("**")에 대해 아래와 같은 CORS 정책을 적용
             * - 프론트엔드 React 서버 (localhost:3000)에서 백엔드 API 호출을 허용
             * - 허용 메서드: GET, POST, PUT, DELETE
             * - 모든 헤더 허용 ("*")
             */
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // ✅ 모든 경로에 적용
                        .allowedOrigins("http://localhost:3000") // ✅ React 개발 서버 주소만 허용
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // ✅ 허용되는 HTTP 메서드
                        .allowedHeaders("*"); // ✅ 모든 요청 헤더 허용
            }
        };
    }
}
