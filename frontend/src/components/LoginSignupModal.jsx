import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function LoginSignupModal({ open, setOpen }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔍 입력값 공백 제거
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
      const url = isLogin
        ? "http://localhost:13306/api/users/login"
        : "http://localhost:13306/api/users/register";

      const payload = isLogin
        ? { username: trimmedUsername, password: trimmedPassword }
        : { name, phone, email, username: trimmedUsername, password: trimmedPassword };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        // ❗에러 응답이면 메시지 보여주기
        throw new Error(result.message || "서버 오류가 발생했습니다.");
      }

      alert(result.message || (isLogin ? "로그인 성공" : "회원가입 성공"));

      if (isLogin && result.name) {
        setUser({ name: result.name, username: trimmedUsername });
      }

      resetForm();
      setOpen(false);

    } catch (err) {
      console.error(err);
      alert(err.message || "요청 중 오류가 발생했습니다.");
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
            // 🧼 포커스가 백그라운드로 안 빠지게 하기
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
