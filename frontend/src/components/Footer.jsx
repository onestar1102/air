import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[rgba(5,32,60,0.9)] text-white p-8 text-sm mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">
        <div className="bg-[#25364a] px-4 py-2 rounded text-white font-bold">
          대한민국 · 한국어 · ₩ KRW
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-white">
          <div>
            <ul className="space-y-1">
              <li>도움말</li>
              <li>개인정보 설정</li>
              <li>로그인</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-1">
              <li>쿠키 정책</li>
              <li>개인정보처리방침</li>
              <li>서비스 약관</li>
              <li>회사 정보</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-1">
              <li>탐색</li>
              <li>회사</li>
              <li>파트너</li>
              <li>여행 일정</li>
              <li>전세계 사이트</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <p>전 세계 저가 항공권을 비교하고 예약하세요</p>
        <p>© ShinguAir Ltd 2002 – 2025</p>
      </div>
    </footer>
  );
}
