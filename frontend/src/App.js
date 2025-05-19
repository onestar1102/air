// App.js
import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import MyPage from "./components/MyPage"; // ✅ 마이페이지 컴포넌트 추가
import AirlineSearch from './components/Airline_search';
import "react-datepicker/dist/react-datepicker.css";

// 로그인 사용자 정보 공유를 위한 Context 생성
export const UserContext = createContext(null);

export default function App() {
  const [user, setUser] = useState(null); // 로그인 사용자 상태
  const [searchData, setSearchData] = useState(null); // 항공권 검색 데이터 상태

  // ✅ 새로고침 시 localStorage에서 로그인 정보 복구
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ user 상태 변경 시 localStorage 업데이트
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      {/* 전체 앱에 user 정보를 제공 */}
      <UserContext.Provider value={{ user, setUser }}>
        <div className="flex flex-col min-h-screen">
          <Header searchData={searchData} user={user} setUser={setUser} /> {/* ✅ 로그인 상태 전달 */}

          <main className="flex-grow">
            <Routes>
              {/* 메인 페이지에서는 검색 결과 상태 설정 가능 */}
              <Route path="/" element={<MainPage setSearchData={setSearchData} />} />
              <Route path="/airline_search" element={<AirlineSearch />} />
              {/* ✅ 마이페이지 경로 추가 및 user prop 전달 */}
              <Route path="/mypage" element={<MyPage />} /> {/* ✅ prop 제거 */}
            </Routes>
          </main>

          <Footer />
        </div>
      </UserContext.Provider>
    </Router>
  );
}
