import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../App";
import axios from "../api/axiosInstance";

const axiosInstance = axios.create({
    baseURL: "/api", // ✅ 프록시 덕분에 자동으로 http://localhost:8000/api 로 요청됨
    withCredentials: true, // 필요한 경우 인증 쿠키 유지
});

export default function MyPage() {
    const navigate = useNavigate();
    const { user, setUser} = useContext(UserContext);

    // 유저 정보 없을 때 기본 화면
    if (!user || !user.name) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold">마이페이지</h2>
            </div>
        );
    }

    /* ------------------------------------------------------------------ */
    /* ✅ 계정 삭제 핸들러 ------------------------------------------------ */
    /* ------------------------------------------------------------------ */
    const handleDeleteAccount = async () => {
        if (!window.confirm("정말로 계정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.")) {
            return;
        }

        try {
            // ✅ axiosInstance 사용 + baseURL 적용됨 → 실제로는 DELETE /api/users/by-username/{username}
            const response = await axios.delete(`/users/by-username/${user.username}`);

            alert(response.data.message || "계정이 삭제되었습니다.");
            localStorage.removeItem("user");
            setUser(null);
            navigate("/");

        } catch (err) {
            console.error("계정 삭제 실패:", err);

            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "계정 삭제 중 오류가 발생했습니다.";

            alert(errorMessage);
        }
    };
    /* ------------------------------------------------------------------ */

    // 사용자 이름으로 이니셜 생성 (예: YB)
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
                    {/* 사용자 이니셜 원형 프로필 */}
                    <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                        {initials}
                    </div>

                    {/* 이메일 표시 */}
                    <div className="text-center">
                        <p className="font-bold text-lg">안녕하세요!</p>
                        <p className="text-gray-600">{user.email}</p>
                    </div>

                    {/* 메뉴 리스트 */}
                    {/*미구현*/}
                    <div className="w-full mt-6 space-y-4">
                        <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100">
                            🎫 내 예약
                        </button>
                        <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100">
                            🔔 가격 변동 알림
                        </button>
                        <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100">
                            👤 계정
                        </button>
                    </div>

                    {/* 로그아웃 버튼 */}
                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        로그아웃
                    </button>
                </div>
            </div>

            {/* 오른쪽 콘텐츠 영역 */}
            {/*부분 미구현*/}
            <div className="md:w-2/3">
                {/* 페이지 제목 */}
                <h2 className="text-2xl font-bold mb-6">계정</h2>

                {/* 이메일 정보 */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-600 mb-2">일반 정보</h3>
                    <p className="text-lg font-medium">{user.email}</p>
                </div>

                {/* 구독 설정 */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-600 mb-2">구독</h3>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        최신 여행 상품, 소식, 인기 여행지에 대해 메일로 안내 받고 싶어요.
                    </label>
                </div>

                {/* 선호하는 출발 공항 */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-600 mb-2">선호하는 출발 공항</h3>
                    <p className="text-sm text-gray-500 mb-2">
                        가장 적합한 특가 상품과 추천 여행지를 보여드릴 수 있도록 선호하는 공항을 추가하세요.
                    </p>
                    <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                        공항 추가하기
                    </button>
                </div>

                {/* ✅ 계정 삭제 */}
                <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-600 mb-2">계정</h3>
                    <button
                        onClick={handleDeleteAccount} // ✅ 삭제 핸들러 연결
                        className="text-red-600 hover:underline"
                    >
                        계정 삭제
                    </button>
                </div>
            </div>
        </div>
    );
}
export default axiosInstance;
