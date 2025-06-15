import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { useTranslation } from "react-i18next"; // ✅ 다국어 훅 추가

export default function LoginSignupModal({ open, setOpen, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { t } = useTranslation();
  const { setUser } = useContext(UserContext);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    resetForm();
  }, [isLogin]);

  useEffect(() => {
    if (open) {
      setIsLogin(true);
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      alert(t("login.alert"));
      return;
    }

    try {
      const url = isLogin
          ? "http://localhost:8080/api/users/login"
          : "http://localhost:8080/api/users/register";

      const payload = isLogin
          ? { username: trimmedUsername, password: trimmedPassword }
          : { name, phone, email, username: trimmedUsername, password: trimmedPassword };

      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const result = response.data;
      alert(result.message || (isLogin ? t("login.success") : t("signup.success")));

      if (isLogin && result.name) {
        const userData = {
          name: result.name,
          username: result.username,
          email: result.email,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        onLoginSuccess(result.name);
      }

      if (!isLogin) {
        setIsLogin(true); // 회원가입 후 로그인 폼으로 전환
      }

      resetForm();
      setOpen(false);
    } catch (err) {
      const msg = err.response?.data?.message || t("error.default");
      alert(msg);
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
            {isLogin ? t("login.title") : t("signup.title")}
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
            {!isLogin && (
                <>
                  <input
                      type="text"
                      placeholder={t("signup.name")}
                      className="input input-bordered w-80 text-black"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                  <input
                      type="tel"
                      placeholder={t("signup.phone")}
                      className="input input-bordered w-80 text-black"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                      type="email"
                      placeholder={t("signup.email")}
                      className="input input-bordered w-80 text-black"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </>
            )}
            <input
                type="text"
                placeholder={t("login.username")}
                className="input input-bordered w-80 text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder={t("login.password")}
                className="input input-bordered w-80 text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary w-80 mt-2">
              {isLogin ? t("login.button") : t("signup.button")}
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            {isLogin ? (
                <>
                  {t("login.noAccount")}{" "}
                  <button
                      onClick={() => setIsLogin(false)}
                      className="text-blue-500 hover:underline"
                  >
                    {t("login.toSignup")}
                  </button>
                </>
            ) : (
                <>
                  {t("signup.hasAccount")}{" "}
                  <button
                      onClick={() => setIsLogin(true)}
                      className="text-blue-500 hover:underline"
                  >
                    {t("signup.toLogin")}
                  </button>
                </>
            )}
          </div>
        </div>
      </dialog>
  );
}
