package com.air.air.model;

import jakarta.persistence.*;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity // ✅ 이 클래스는 JPA를 통해 DB 테이블과 매핑되는 엔티티임을 의미
@EntityListeners(AuditingEntityListener.class)
// ✅ 엔티티 생성 시간 자동 기록을 위한 JPA 감사(Auditing) 리스너 등록

@Getter @Setter // ✅ 모든 필드의 getter/setter 자동 생성 (Lombok)
@NoArgsConstructor // ✅ 기본 생성자 자동 생성
@AllArgsConstructor // ✅ 모든 필드를 매개로 받는 생성자 자동 생성
@Data // ✅ Lombok: equals/hashCode/toString 포함 전체 도우미 제공 (단, @Getter/@Setter 중복 사용 시 주의)

@XmlRootElement(name = "response")
// ✅ XML 파싱 시 <response> 루트 엘리먼트로 이 클래스가 사용될 수 있음을 명시 (JAXB)
@XmlAccessorType(XmlAccessType.FIELD)
// ✅ XML 바인딩 시 필드 기준으로 매핑 (getter/setter가 아닌 실제 필드 값 기준으로 읽기)

public class AirInfo {

    @Id // ✅ 기본 키(PK) 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // ✅ DB에서 자동 증가(AUTO_INCREMENT) 전략 적용
    private Long id;

    // ✅ 항공편 번호 (예: KE123)
    private String flightNumber;

    // ✅ 출발지 공항 코드 (예: ICN)
    private String departure;

    // ✅ 도착지 공항 코드 (예: GMP)
    private String arrival;

    // ✅ 출발 시간 (예: 2025-05-27T08:00)
    private String departureTime;

    // ✅ 도착 시간 (예: 2025-05-27T09:20)
    private String arrivalTime;

    // ✅ 남은 좌석 수
    private int seatsAvailable;

    // ✅ 항공사명 (예: 대한항공)
    private String airlineName;

    // ✅ 일반석 요금 (원 단위)
    private Integer economyCharge;

    // ✅ 프레스티지석 요금 (원 단위)
    private Integer prestigeCharge;

    @CreatedDate // ✅ 데이터가 생성된 시각을 자동 저장
    @Column(updatable = false) // ✅ 저장 후 수정 불가
    private java.time.LocalDateTime createdAt;
}
