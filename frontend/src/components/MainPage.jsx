
import { BedDouble, Car, Search, ChevronDown } from 'lucide-react';
import React, {useEffect} from "react";
import axios from 'axios';

const MainPage = ({setSearchData}) => {
  useEffect(() => {
    axios.get("/api/air")
        .then(response => {
          setSearchData(response.data);
        })
        .catch(error => {
          console.error("항공편 데이터 불러오기 실패:", error);
        });
  }, [setSearchData]);
  return (
    <div className="bg-white text-black px-6 py-10 space-y-10">

      {/* --- 상단 카테고리 버튼들 --- */}
      <div className="flex flex-wrap justify-center gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-[#002d63] text-white rounded-xl shadow-md hover:brightness-110">
          <BedDouble className="w-5 h-5" />
          호텔
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#002d63] text-white rounded-xl shadow-md hover:brightness-110">
          <Car className="w-5 h-5" />
          렌터카
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#002d63] text-white rounded-xl shadow-md hover:brightness-110">
          <Search className="w-5 h-5" />
          어디든지 검색
        </button>
      </div>

      {/* --- Drops 프로모션 영역 --- */}
      <div className="rounded-2xl overflow-hidden bg-[#f3f3f3]">
        <div className="flex flex-col md:flex-row">
          {/* 텍스트 영역 */}
          <div className="p-6 md:p-10 flex flex-col justify-center bg-[#ffe1e1] md:w-1/2">
            <p className="font-semibold mb-2">잠깐, 뭐라고요?</p>
            <h2 className="text-3xl font-bold mb-4 leading-snug">
              20% 이상 저렴해진 항공권을 찾아보세요
            </h2>
            <p className="mb-4">
              앱에서 Drops를 열어 원하는 공항에서 출발하는 오늘의 항공편을
              20% 이상 할인된 가격으로 만나보세요.
            </p>
            <button className="btn btn-sm bg-black text-white rounded-full w-fit px-5 shadow">
              Drops 둘러보기
            </button>
          </div>

          {/* 이미지 영역 */}
          <div className="md:w-1/2">
            {/* 👇 여기에 이미지 삽입 */}
            <img
              src="/img/shinguair.jpg" // 👉 실제 경로로 바꿔줘
              alt="Drops Promotion"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>

      {/* --- FAQ 섹션 --- */}
      <div>
        <h2 className="text-2xl font-bold mb-6">ShinguAir로 항공권 예약하기</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'ShinguAir는 어떻게 작동하나요?',
            'ShinguAir에서 최저가 항공권을 어떻게 찾을 수 있나요?',
            '지금 어디로 가는 항공권을 예약하는 게 좋은가요?',
            'ShinguAir 사이트에서 항공권을 예약하는 건가요?',
            '항공권을 예약한 후에는 어떻게 되나요?',
          ].map((q, i) => (
            <div key={i} className="flex justify-between items-center border p-3 rounded-md">
              <span>{q}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          ))}
          {[
            'ShinguAir에서 호텔도 검색할 수 있나요?',
            '렌터카 상품도 검색할 수 있나요?',
            '가격 변동 알림이란 무엇인가요?',
            '변경 가능한 항공권을 예매할 수 있나요?',
            '이산화탄소 배출량이 적은 항공편을 예약할 수 있나요?',
          ].map((q, i) => (
            <div key={i + 5} className="flex justify-between items-center border p-3 rounded-md">
              <span>{q}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          ))}
        </div>
      </div>

      {/* --- 전 세계 사이트 --- */}
      <div>
        <h2 className="text-xl font-bold">전 세계 사이트</h2>
        <div className="border-t mt-2" />
      </div>

      {/* --- 여행 계획 섹션 --- */}
      <div>
        <h2 className="text-xl font-bold mb-4">여행 계획을 세워보세요</h2>
        <div className="flex gap-2 mb-4">
          {['공항', '국가', '지역', '도시'].map((label, idx) => (
            <button
              key={idx}
              className={`btn btn-sm rounded-full px-4 ${
                idx === 0 ? 'btn-neutral text-white' : 'btn-outline'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-5 gap-4 text-sm text-blue-600">
          <div className="space-y-1">
            <p>하노이 항공권</p>
            <p>칼리보 국제공항 항공권 특가</p>
            <p>덴파사 발리 왕복 항공권</p>
          </div>
          <div className="space-y-1">
            <p>도쿄 나리타 여행</p>
            <p>도쿄 하네다 항공권</p>
            <p>푸켓 왕복 항공편</p>
          </div>
          <div className="space-y-1">
            <p>서울 김포 왕복 항공편</p>
            <p>호치민시티 왕복 항공권</p>
            <p>인천 국제 비행기 표</p>
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === 2 ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
