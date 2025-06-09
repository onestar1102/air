import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import MyPage from './components/MyPage';
import AirBookingPayment from './components/AirBookingPayment';
import FlightCheckout from './components/FlightCheckout';
import AirlineSearch from "./components/Airline_search";
import "react-datepicker/dist/react-datepicker.css";
import './i18n/i18n';  // ✅추가

// 로그인 사용자 정보를 공유할 Context 생성
export const UserContext = createContext(null);

export default function App() {
  // 로그인 사용자 상태 (예: { name: '홍길동', username: 'hong123' })
  const [user, setUser] = useState(null);

  //  앱이 처음 렌더링될 때 localStorage에서 사용자 정보 복원
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //  이 줄을 추가해서 항상 최신 상태 유지

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // 항공권 검색 결과 상태 (Header 등에서 검색 결과 활용 가능)
  const [searchData, setSearchData] = useState(null);

  return (
      <Router>
        {/* Context.Provider로 user 상태를 전역에서 사용 가능하게 함 */}
        <UserContext.Provider value={{ user, setUser }}>
          <div className="flex flex-col min-h-screen">
            {/* Header에 로그인 상태, setter 전달 */}
            <Header searchData={searchData} user={user} setUser={setUser} />

            <main className="flex-grow">
              <Routes>
                {/* 메인 페이지: 검색 시 setSearchData로 결과 저장 */}
                <Route path="/" element={<MainPage setSearchData={setSearchData} />} />

                {/* 항공권 검색 결과 페이지 */}
                <Route path="/airline_search" element={<AirlineSearch />} />

                {/* 수정 마이페이지 경로 추가 및 user prop 전달 */}
                <Route path="/mypage" element={<MyPage />} />

                {/*  FlightCheckout 라우트 */}
                <Route path="/flight-checkout" element={<FlightCheckout />} />

                {/*  AirBookingPayment 라우트 추가 */}
                <Route path="/airbooking-payment" element={<AirBookingPayment />} />



              </Routes>
            </main>

            {/* 공통 하단 */}
            <Footer />
          </div>
        </UserContext.Provider>
      </Router>
  );
}
