import React, { useState, useEffect } from "react";
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
  FaBars,
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("/api/air")
        .then(response => {
          console.log("받은 데이터:", response.data); // ✅ 일단 확인용

          const air = response.data;

          const departureAirports = [...new Set(air.map(f => f.departure))];

          const options = departureAirports.map(code => ({
            value: code,
            label: code
          }));

          setAirportOptions(options);
        })
        .catch(error => {
          console.error("공항 목록 불러오기 실패", error);
        });
  }, []);

  const handleSearch = () => {
    if (!departure || !arrival || !startDate) {
      alert("출발지, 도착지, 가는 편 날짜를 모두 선택해주세요.");
      return;
    }

    if (departure.value === arrival.value) {
      alert("출발지와 도착지는 서로 달라야 합니다.");
      return;
    }
    //수정 2025-04-28
    const searchParams = new URLSearchParams({
        departure: departure.value,
        arrival:arrival.value,
        date: startDate.toISOString().slice(0, 10).replace(/-/g,''),//'yyyymmdd'형태로 변환
    });
    navigate(`/Airline_search?${searchParams.toString()}`);
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
            <span className="cursor-pointer" onClick={() => setShowModal(true)}>
            {isLoggedIn ? "마이페이지" : "로그인"}
          </span>
            <FaBars className="text-xl" />
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

              <LoginSignupModal
                  open={showModal}
                  setOpen={setShowModal}
                  onLoginSuccess={() => setIsLoggedIn(true)}
              />
            </div>
        )}
      </div>
  );
}
