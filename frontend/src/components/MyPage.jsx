import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useTranslation } from "react-i18next";  // ✅ 추가
import axios from "axios"; // ✅ axios import 추가

export default function MyPage() {
    const { t } = useTranslation();
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(t("mypage.deleteAccount.confirm")); // ✅ 수정: 올바른 다국어 key로 변경
        if (!confirmed || !user?.username) return;

        try {
            // [✅ axios 변경]
            const res = await axios.delete(`http://localhost:8888/api/users/${user.username}`);

            if (res.status === 200) {
                alert(t("mypage.deleteAccount.success")); // ✅ 수정
                localStorage.removeItem("user");
                setUser(null);
                navigate("/");
                window.location.reload();
            } else {
                alert(t("mypage.deleteAccount.failure")); // ✅ 수정
            }
        } catch (error) {
            alert(t("mypage.deleteAccount.serverError")); // ✅ 수정
        }
    };

    if (!user) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold">{t("mypage.title")}</h2>
                <p className="text-gray-500 mt-2">{t("mypage.loading")}</p>
            </div>
        );
    }

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="flex flex-col md:flex-row p-10 gap-10">
            {/* 왼쪽 사이드바 */}
            <div className="md:w-1/3 border-r md:pr-10">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                        {initials}
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-lg">{t("mypage.greeting")}</p>
                        <p className="text-gray-600">{user.email}</p>
                    </div>

                    {/* 사이드 메뉴 */}
                    <div className="w-full mt-6 divide-y">
                        <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100">
                            🎫 {t("mypage.menu.reservations")} {/* ✅ 수정 */}
                        </button>
                        <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100">
                            🔔 {t("mypage.menu.alerts")} {/* ✅ 수정 */}
                        </button>
                        <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100">
                            👤 {t("mypage.menu.account")} {/* ✅ 수정 */}
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            localStorage.removeItem("user");
                            setUser(null);
                            navigate("/");
                            window.location.reload();
                        }}
                        className="mt-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        {t("mypage.logout")}
                    </button>
                </div>
            </div>

            {/* 오른쪽 콘텐츠 영역 */}
            <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-6">
                    {t("mypage.accountSection.title")} {/* ✅ 수정 */}
                </h2>

                <div className="mb-6">
                    <h3 className="font-semibold text-gray-600 mb-2">
                        {t("mypage.accountSection.emailLabel")} {/* ✅ 수정 */}
                    </h3>
                    <p className="text-lg font-medium">{user.email}</p>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold text-gray-600 mb-2">
                        {t("mypage.accountSection.subscription1")} {/* ✅ 수정 */}
                    </h3>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        {t("mypage.accountSection.subscription2")} {/* ✅ 중복 또는 메시지가 다르면 별도로 키를 만들어도 됨 */}
                    </label>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold text-gray-600 mb-2">
                        {t("mypage.accountSection.airportPreference.title")} {/* ✅ 수정 */}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                        {t("mypage.accountSection.airportPreference.description")} {/* ✅ 수정 */}
                    </p>
                    <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                        {t("mypage.accountSection.airportPreference.addButton")} {/* ✅ 수정 */}
                    </button>
                </div>

                <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-600 mb-2">
                        {t("mypage.menu.account")} {/* ✅ 수정 */}
                    </h3>
                    <button
                        onClick={handleDeleteAccount}
                        className="text-red-600 hover:underline"
                    >
                        {t("mypage.deleteAccount.button")} {/* ✅ 수정 */}
                    </button>
                </div>
            </div>
        </div>
    );
}
