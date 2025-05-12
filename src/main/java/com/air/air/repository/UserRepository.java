package com.air.air.repository;


import com.air.air.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 🔍 아이디 중복 검사
    boolean existsByUsername(String username);

    // 🔍 이메일 중복 검사
    boolean existsByEmail(String email);

    // 🔍 특정 아이디로 사용자 조회
    Optional<User> findByUsername(String username);

    // 🔍 이메일로 사용자 조회 (추가됨)
    Optional<User> findByEmail(String email);
}
