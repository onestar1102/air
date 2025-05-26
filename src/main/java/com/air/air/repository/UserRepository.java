package com.air.air.repository;

import com.air.air.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// ✅ User 엔티티에 대한 JPA 기반 Repository 인터페이스
// 기본적으로 findAll, save, deleteById 등 CRUD 메서드를 제공함
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 🔍 아이디 중복 검사용
     * - 사용 위치: UserService.registerUser()
     * - 회원가입 시 같은 username이 있는지 검사
     */
    boolean existsByUsername(String username);

    /**
     * 🔍 이메일 중복 검사용
     * - 사용 위치: UserService.registerUser()
     * - 회원가입 시 같은 email이 있는지 검사
     */
    boolean existsByEmail(String email);

    /**
     * 🔍 특정 아이디(username)로 사용자 정보 조회
     * - 사용 위치: 로그인(UserService.loginUser), 정보 확인
     */
    Optional<User> findByUsername(String username);

    /**
     * 🔍 특정 이메일(email)로 사용자 정보 조회
     * - 사용 위치: 이메일 중복 검사, 혹은 추후 비밀번호 찾기 등
     */
    Optional<User> findByEmail(String email);

    /**
     * ✅ 회원 탈퇴 시 사용자 삭제
     * - 사용 위치: UserService.deleteByUsername()
     * - ID(username)를 기준으로 사용자 삭제 수행
     */
    void deleteByUsername(String username);
}
