import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../App";

export default function LoginSignupModal({ open, setOpen, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setUsername("");
    setPassword("");
  };
  // ✅ 모드(로그인/회원가입) 변경 시 모든 입력값 초기화
  useEffect(() => {
    resetForm();
  }, [isLogin]);

  // ✅ 모달이 열릴 때 항상 로그인 모드로 초기화
  useEffect(() => {
    if (open) {
      setIsLogin(true);
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (isLogin) {
      if (!trimmedUsername || !trimmedPassword) {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
      }
    } else {
      if (
          !name.trim() || !phone.trim() || !email.trim() ||
          !trimmedUsername || !trimmedPassword
      ) {
        alert("모든 필드를 입력해주세요.");
        return;
      }
    }

    try {
      const url = isLogin ? "/api/users/login" : "/api/users/register";

      const payload = isLogin
          ? { username: trimmedUsername, password: trimmedPassword }
          : { name, phone, email, username: trimmedUsername, password: trimmedPassword };

      // ✅ axios로 POST 요청 보내기
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const result = response.data;
      console.log("백엔드 응답:", result);
      alert(result.message || (isLogin ? "로그인 성공" : "회원가입 성공"));

      if (isLogin && result.name) {
        const userData = {
          name: result.name,
          username: result.username, // ✅ result.username 사용
          email: result.email        // ✅ email도 포함
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        onLoginSuccess(result.name);
      }
      if (!isLogin) {
        setIsLogin(true); // ✅ 회원가입 후 로그인 폼으로 전환
      }

      resetForm();
      setOpen(false);
    } catch (err) {
      const message = err.response?.data?.message || err.message || "요청 중 오류가 발생했습니다.";
      console.error(err);
      alert(message);
    }
  };

  return (
      <dialog id="auth_modal" className="modal" open={open}>
        <div className="modal-box">
          <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                resetForm();
                setOpen(false);
                document.activeElement?.blur();
              }}
          >
            ✕
          </button>

          <h3 className="font-bold text-xl text-center mb-4">
            {isLogin ? "로그인" : "회원가입"}
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
            {!isLogin && (
                <>
                  <input
                      type="text"
                      placeholder="이름"
                      className="input input-bordered w-80"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                  <input
                      type="tel"
                      placeholder="전화번호"
                      className="input input-bordered w-80"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                      type="email"
                      placeholder="이메일"
                      className="input input-bordered w-80"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </>
            )}
            <input
                type="text"
                placeholder="아이디"
                className="input input-bordered w-80"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                className="input input-bordered w-80"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary w-80 mt-2">
              {isLogin ? "로그인" : "회원가입"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            {isLogin ? (
                <>
                  계정이 없으신가요?{" "}
                  <button
                      onClick={() => setIsLogin(false)}
                      className="text-blue-500 hover:underline"
                  >
                    회원가입
                  </button>
                </>
            ) : (
                <>
                  이미 계정이 있으신가요?{" "}
                  <button
                      onClick={() => setIsLogin(true)}
                      className="text-blue-500 hover:underline"
                  >
                    로그인
                  </button>
                </>
            )}
          </div>
        </div>
      </dialog>
  );
}
