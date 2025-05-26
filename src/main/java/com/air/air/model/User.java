package com.air.air.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity // ✅ 이 클래스는 JPA 엔티티로 사용되며 DB 테이블과 매핑됨
@Data // ✅ Lombok: getter/setter, toString, equals 등 자동 생성
@Table(name = "user")
// ✅ 해당 엔티티는 DB의 "user" 테이블과 매핑됨
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    // ✅ 기본 키 (PK) 컬럼명: user_id (AUTO_INCREMENT)
    private Long id;

    @Column(unique = true)
    // ✅ 사용자 로그인 ID, 중복 허용하지 않음
    private String username;

    @Column(unique = true)
    // ✅ 사용자 이메일, 중복 허용하지 않음 (아이디 찾기 등에도 활용 가능)
    private String email;

    // ✅ 사용자 실명
    private String name;

    // ✅ 비밀번호 (암호화 저장 권장)
    private String password;

    // ✅ 전화번호
    private String phoneNumber;
}
