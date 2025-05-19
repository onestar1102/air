import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useNavigate, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {
    FaPlaneDeparture,
    FaPlaneArrival,
    FaCar,
    FaHotel,
    FaGlobe,
    FaHeart,
    FaUserCircle,
    FaBars, FaQuestionCircle,
} from "react-icons/fa";

import axios from "axios";
import LoginSignupModal from "./LoginSignupModal";

export default function Header({ searchData }) {
  const [airportOptions, setAirportOptions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState("항공편");
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [directOnly, setDirectOnly] = useState(false);

    // ✅ 햄버거 메뉴 상태 및 외부 클릭 감지를 위한 ref
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const menuRef = useRef(null);

    // ✅ 외부 클릭 시 햄버거 메뉴 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setHamburgerOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ✅ 로그인 관련 상태
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userName, setUserName] = useState(""); // ✅ 사용자 이름 상태 추가

    useEffect(() => {
        axios.get("/api/air", {
            params: { page: 0, size: 1000 } // 충분히 크게 받아오기
        })
            .then(response => {
                const allFlights = response.data.content;  // ✨ content로 수정
                const uniqueAirports = [...new Set(allFlights.map(f => f.departure))];
                setAirportOptions(uniqueAirports.map(airport => ({ value: airport, label: airport })));
                //로그인 유지 함수
                const savedUser = localStorage.getItem("user");
                if (savedUser) {
                    const userData = JSON.parse(savedUser);
                    setUserName(userData.name);
                    setIsLoggedIn(true);
                }
            })
            .catch(error => {
                console.error("공항 데이터 로딩 실패", error);
            });
    }, []);

  //   handleSearch 수정 05-19
  const handleSearch = () => {

    if (!departure || !arrival || !startDate) {
      alert("출발지, 도착지, 가는 편 날짜를 모두 선택해주세요.");
      return;
    }

    if (departure.value === arrival.value) {
      alert("출발지와 도착지는 서로 달라야 합니다.");
      return;
    }

      // yyyyMMdd 포맷 함수 추가 - 05-19
      const formatDate = (date) => {
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          return `${yyyy}${mm}${dd}`;
      };

    //수정 2025-05-19
    const searchParams = new URLSearchParams({
        departure: departure.value,
        arrival:arrival.value,
        date: formatDate(startDate), // ✅ 여기에서 변경!
    });
      // 오는편 날짜가 있으면 추가
      if (returnDate) {
          searchParams.append('returnDate', formatDate(returnDate));
      }

      navigate(`/Airline_search?${searchParams.toString()}`);
  };
    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUserName(""); // ✅ 로그아웃 시 사용자 이름 초기화
        navigate("/");           // ✅ 로그아웃 후 홈으로 이동
    };

  return (
      <div className="bg-[#03284F] text-white p-10 w-full">
        <div className="flex justify-between items-center">
          <div className="text-4xl font-bold flex items-center space-x-2">
            <a href="http://localhost:3000/">Shinguair</a>
          </div>
          <div className="space-x-4 flex items-center">
            <FaGlobe />
            <FaHeart />
            <FaUserCircle />
              {/* ✅ 로그인/로그아웃 토글 → “로그아웃” 제거 */}
              {!isLoggedIn && (                       /* 로그인 안 됐을 때만 표시 */
                  <span className="cursor-pointer" onClick={() => setShowModal(true)}>
              로그인
            </span>)}

              {/* ✅ 닉네임은 단순 표시 (마이페이지 이동 삭제) */}
              {isLoggedIn && (
                  <span className="ml-2 font-semibold">
              {userName}님
            </span>
              )}

              {/* ✅ 햄버거 메뉴 아이콘 */}
              <FaBars className="text-xl cursor-pointer" onClick={() => setHamburgerOpen(!hamburgerOpen)} />

              {/* ✅ 햄버거 메뉴 드롭다운 */}
              {hamburgerOpen && (
                  <div
                      ref={menuRef}
                      className="absolute right-0 top-10 w-60 bg-white text-black rounded-xl shadow-lg z-50"
                  >
                      <ul className="py-2 text-sm">
                          <li className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer">
                              <FaPlaneDeparture className="mr-3 text-blue-600" /> 항공권
                          </li>
                          <li className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer">
                              <FaHotel className="mr-3 text-blue-600" /> 호텔
                          </li>
                          <li className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer">
                              <FaCar className="mr-3 text-blue-600" /> 렌터카
                          </li>
                          {/* ✅ 도움말 메뉴 항목 추가 */}

                          <hr className="my-1" />
                          {/* ✅ 마이페이지 클릭 시 /mypage 이동 */}
                          {isLoggedIn && (
                              <li
                                  className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer"
                                  onClick={() => {
                                      navigate("/mypage");          // ✅ 이동
                                      setHamburgerOpen(false);      // ✅ 메뉴 닫기
                                  }}
                              >
                                  <FaUserCircle className="mr-3 text-gray-600" /> 마이페이지
                              </li>)}
                          {/* ✅ 로그아웃 메뉴 추가 */}
                          {isLoggedIn && (
                              <li
                                  className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer text-red-500"
                                  onClick={handleLogout}
                              >
                                  <FaUserCircle className="mr-3" /> 로그아웃
                              </li>
                          )}
                          {/* ✅ 도움말 메뉴 항목 추가 */}
                          <li
                              className="px-5 py-3 hover:bg-gray-100 flex items-center cursor-pointer"
                              onClick={() => {
                                  navigate("/help"); // 도움말 페이지로 이동
                                  setHamburgerOpen(false); // 메뉴 닫기
                              }}
                          >
                              <FaQuestionCircle className="mr-3 text-gray-600" /> 도움말
                          </li>
                      </ul>
                  </div>
              )}
          </div>
        </div>

        <div className="space-x-2 hidden md:flex mt-6">
          {[{ label: "항공편", icon: <FaPlaneDeparture /> },
            { label: "호텔", icon: <FaHotel /> },
            { label: "렌터카", icon: <FaCar /> },
          ].map((tab) => (
              <button
                  key={tab.label}
                  onClick={() => setSelectedTab(tab.label)}
                  className={`btn btn-sm ${selectedTab === tab.label ? "btn-primary" : "btn-outline"}`}
              >
                {tab.icon}
                <span className="ml-1">{tab.label}</span>
              </button>
          ))}
        </div>

        <h1 className="text-2xl md:text-4xl font-bold mt-6 mb-2">
          {selectedTab === "항공편" && "수백만 개의 저가 항공권. 검색 한 번으로 간단하게."}
          {selectedTab === "호텔" && "전 세계 숙소를 찾아보세요. 가격 비교로 알뜰하게."}
          {selectedTab === "렌터카" && "렌터카 예약도 간편하게. 원하는 시간과 장소에서!"}
        </h1>

        {selectedTab === "항공편" && (
            <div className="bg-white rounded-xl mt-4 p-4 grid md:grid-cols-7 gap-2 text-black items-end">
              <div>
                <div className="text-sm">출발지</div>
                <Select
                    options={airportOptions}
                    value={departure}
                    onChange={setDeparture}
                    placeholder="출발지 선택"
                />
              </div>
              <div className="md:col-span-2">
                <div className="text-sm">도착지</div>
                <Select
                    options={airportOptions}
                    value={arrival}
                    onChange={setArrival}
                    placeholder="도착지 선택"
                />
              </div>
              <div>
                <div className="text-sm">가는 편</div>
                <div className="border border-gray-300 rounded-md px-3 py-2">
                  <DatePicker
                      selected={startDate}
                      onChange={setStartDate}
                      placeholderText="날짜 입력"
                      className="w-full focus:outline-none bg-transparent"
                      minDate={new Date()}
                  />
                </div>
              </div>
              <div>
                <div className="text-sm">오는 편</div>
                <div className="border border-gray-300 rounded-md px-3 py-2">
                  <DatePicker
                      selected={returnDate}
                      onChange={setReturnDate}
                      placeholderText="날짜 입력"
                      className="w-full focus:outline-none bg-transparent"
                      minDate={startDate || new Date()}
                  />
                </div>
              </div>
              <div>
                <div className="text-sm">인원</div>
                <input
                    type="number"
                    min="1"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="bg-white text-black border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div>
                <button className="btn btn-primary w-full py-4 px-6 text-lg font-bold" onClick={handleSearch}>
                  검색하기
                </button>
              </div>

              <div className="md:col-span-7 flex items-center space-x-2 mt-2">
                <input
                    type="checkbox"
                    id="directOnly"
                    className="checkbox checkbox-primary checkbox-sm"
                    checked={directOnly}
                    onChange={() => setDirectOnly(!directOnly)}
                />
                <label htmlFor="directOnly" className="text-sm text-gray-900 font-semibold">
                  직항만 보기
                </label>
              </div>

                {/* ✅ 로그인/회원가입 모달 */}
                <LoginSignupModal
                    open={showModal}
                    setOpen={setShowModal}
                    onLoginSuccess={(name) => {
                        setIsLoggedIn(true);
                        setUserName(name); // ✅ 로그인 성공 시 사용자 이름 저장
                        localStorage.setItem("user", JSON.stringify({ name })); // ✅ 로그인 정보 저장
                    }}
                />
            </div>
        )}
      </div>
  );
}
