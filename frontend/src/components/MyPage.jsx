import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage({ user }) {
    const navigate = useNavigate();

    if (!user || !user.name) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold">마이페이지</h2>
                <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
                    홈으로 이동
                </button>
            </div>
        );
    }

    return (
        <div className="p-10 text-center">
            <h2 className="text-2xl font-bold">마이페이지</h2>
            <p className="mt-4"><strong>이름:</strong> {user.name}</p>
            <p><strong>아이디:</strong> {user.username}</p>
            <button className="mt-6 btn btn-outline" onClick={() => navigate("/")}>
                홈으로 이동
            </button>
        </div>
    );
}
