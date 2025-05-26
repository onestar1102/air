// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const App = () => {
  const [selectedTab, setSelectedTab] = useState('항공권');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('신용카드');
  // 필수 약관 3개 각각의 동의 상태로 변경
  const [agreeTerms1, setAgreeTerms1] = useState(false);
  const [agreeTerms2, setAgreeTerms2] = useState(false);
  const [agreeTerms3, setAgreeTerms3] = useState(false);
  const [passengerName, setPassengerName] = useState('');
  const [passengerNameEng, setPassengerNameEng] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [passengerBirth, setPassengerBirth] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardOwner, setCardOwner] = useState('');

  // 필수 약관 3개 모두 동의해야 결제 버튼 활성화
  const allRequiredAgreed = agreeTerms1 && agreeTerms2 && agreeTerms3;

  const navigate = useNavigate(); // 여기서 navigate를 선언!

  const PaymentComplete = () => {
      navigate("/PaymentComplete");
    }

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
      <div className="min-h-screen bg-gray-100">
        {/* 사이드 메뉴 */}
        {isMenuOpen && (
            <div className="fixed right-0 top-0 h-screen w-64 bg-white shadow-lg z-50 transition-all duration-300 ease-in-out">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">메뉴</h2>
                  <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <ul className="space-y-4">
                  <li className="flex items-center py-2 border-b">
                    <i className="fas fa-plane-departure mr-4 text-blue-600"></i>
                    <span className="text-gray-800">항공권</span>
                  </li>
                  <li className="flex items-center py-2 border-b">
                    <i className="fas fa-hotel mr-4 text-blue-600"></i>
                    <span className="text-gray-800">호텔</span>
                  </li>
                  <li className="flex items-center py-2 border-b">
                    <i className="fas fa-car mr-4 text-blue-600"></i>
                    <span className="text-gray-800">렌터카</span>
                  </li>
                  <li className="flex items-center py-2 border-b">
                    <i className="fas fa-user mr-4 text-blue-600"></i>
                    <span className="text-gray-800">마이페이지</span>
                  </li>
                  <li className="flex items-center py-2 border-b">
                    <i className="fas fa-tag mr-4 text-blue-600"></i>
                    <span className="text-gray-800">프로모션</span>
                  </li>
                  <li className="flex items-center py-2 border-b">
                    <i className="fas fa-question-circle mr-4 text-blue-600"></i>
                    <span className="text-gray-800">도움말</span>
                  </li>
                </ul>
              </div>
            </div>
        )}

        {/* 메인 컨텐츠 */}
        <main className="container mx-auto py-8 px-4">
          {/* 진행 상태 표시 */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <i className="fas fa-search"></i>
                </div>
                <span className="mt-2 text-sm text-gray-600">항공권 선택</span>
              </div>
              <div className="flex-1 h-1 bg-indigo-600 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <i className="fas fa-user"></i>
                </div>
                <span className="mt-2 text-sm text-gray-600">탑승객 정보</span>
              </div>
              <div className="flex-1 h-1 bg-indigo-600 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  <i className="fas fa-credit-card"></i>
                </div>
                <span className="mt-2 text-sm font-semibold">결제</span>
              </div>
              <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                  <i className="fas fa-check"></i>
                </div>
                <span className="mt-2 text-sm text-gray-600">완료</span>
              </div>
            </div>
          </div>

          {/* 예약 정보 요약 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">예약 정보</h2>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                    <i className="fas fa-plane-departure"></i>
                  </div>
                  <div>
                    <p className="font-bold">서울 (ICN) → 도쿄 (NRT)</p>
                    <p className="text-sm text-gray-600">2025년 5월 25일, 일요일 • 08:30</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                    <i className="fas fa-plane-arrival"></i>
                  </div>
                  <div>
                    <p className="font-bold">도쿄 (NRT) → 서울 (ICN)</p>
                    <p className="text-sm text-gray-600">2025년 5월 30일, 금요일 • 19:45</p>
                  </div>
                </div>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
                <p className="text-sm text-gray-600 mb-1">승객</p>
                <p className="font-semibold">성인 1명</p>
                <p className="text-sm text-gray-600 mt-2 mb-1">좌석 등급</p>
                <p className="font-semibold">이코노미</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 결제 정보 입력 */}
            <div className="lg:col-span-2">
              {/* 결제 수단 선택 */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">결제 수단</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <button
                      className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer !rounded-button whitespace-nowrap ${paymentMethod === '신용카드' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('신용카드')}
                  >
                    <i className="fas fa-credit-card text-2xl mb-2 text-indigo-600"></i>
                    <span className="text-sm">신용카드</span>
                  </button>
                  <button
                      className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer !rounded-button whitespace-nowrap ${paymentMethod === '계좌이체' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('계좌이체')}
                  >
                    <i className="fas fa-university text-2xl mb-2 text-indigo-600"></i>
                    <span className="text-sm">계좌이체</span>
                  </button>
                  <button
                      className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer !rounded-button whitespace-nowrap ${paymentMethod === '카카오페이' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('카카오페이')}
                  >
                    <i className="fas fa-comment text-2xl mb-2 text-yellow-500"></i>
                    <span className="text-sm">카카오페이</span>
                  </button>
                  <button
                      className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer !rounded-button whitespace-nowrap ${paymentMethod === '네이버페이' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}
                      onClick={() => setPaymentMethod('네이버페이')}
                  >
                    <i className="fas fa-n text-2xl mb-2 text-green-600"></i>
                    <span className="text-sm">네이버페이</span>
                  </button>
                </div>

                {paymentMethod === '신용카드' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">카드 번호</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="0000-0000-0000"
                            value={cardNumber}
                            onChange={(e) => {
                              // 숫자만 추출
                              let onlyNums = e.target.value.replace(/[^0-9]/g, '');
                              // 12자리까지만 허용
                              if (onlyNums.length > 12) onlyNums = onlyNums.slice(0, 12);

                              // 4자리마다 하이픈
                              let formatted = onlyNums;
                              if (onlyNums.length > 4 && onlyNums.length <= 8) {
                                formatted = onlyNums.replace(/(\d{4})(\d{1,4})/, '$1-$2');
                              } else if (onlyNums.length > 8) {
                                formatted = onlyNums.replace(/(\d{4})(\d{4})(\d{1,4})/, '$1-$2-$3');
                              }
                              setCardNumber(formatted);
                            }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">유효 기간</label>
                          <input
                              type="text"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => {
                                // 숫자만 추출
                                let onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                // 4자리까지만 허용
                                if (onlyNums.length > 4) onlyNums = onlyNums.slice(0, 4);

                                // 2자리마다 /
                                let formatted = onlyNums;
                                if (onlyNums.length > 2) {
                                  formatted = onlyNums.replace(/(\d{2})(\d{1,2})/, '$1/$2');
                                }
                                setCardExpiry(formatted);
                              }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                          <input
                              type="text"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="000"
                              value={cardCvc}
                              onChange={(e) => {
                                // 숫자만, 3자리 제한
                                let onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                if (onlyNums.length > 3) onlyNums = onlyNums.slice(0, 3);
                                setCardCvc(onlyNums);
                              }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">카드 소유자 이름</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="카드에 표시된 이름"
                            value={cardOwner}
                            onChange={(e) => setCardOwner(e.target.value)}
                        />
                      </div>
                    </div>
                )}

                {paymentMethod === '계좌이체' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">은행 선택</label>
                        <div className="relative">
                          <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option>은행을 선택하세요</option>
                            <option>국민은행</option>
                            <option>신한은행</option>
                            <option>우리은행</option>
                            <option>하나은행</option>
                            <option>농협은행</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <i className="fas fa-chevron-down text-gray-400"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                )}
              </div>

              {/* 탑승객 정보 */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">탑승객 정보</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">성명 (한글)</label>
                      <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="홍길동"
                          value={passengerName}
                          onChange={(e) => {
                            // 한글만 입력 가능
                            const onlyKorean = e.target.value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, '');
                            setPassengerName(onlyKorean);
                          }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">성명 (영문)</label>
                      <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="HONG GILDONG"
                          value={passengerNameEng}
                          onChange={(e) => {
                            // 영문(대소문자)와 공백만 입력 가능
                            const onlyEng = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                            setPassengerNameEng(onlyEng);
                          }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
                      <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="YYYY-MM-DD"
                          value={passengerBirth}
                          onChange={(e) => {
                            // 숫자만 추출
                            let onlyNums = e.target.value.replace(/[^0-9]/g, '');
                            // 8자리까지만 허용
                            if (onlyNums.length > 8) onlyNums = onlyNums.slice(0, 8);

                            // 자동 하이픈 포맷팅 (YYYY-MM-DD)
                            let formatted = onlyNums;
                            if (onlyNums.length > 4 && onlyNums.length <= 6) {
                              formatted = onlyNums.replace(/(\d{4})(\d{1,2})/, '$1-$2');
                            } else if (onlyNums.length > 6) {
                              formatted = onlyNums.replace(/(\d{4})(\d{2})(\d{1,2})/, '$1-$2-$3');
                            }
                            setPassengerBirth(formatted);
                          }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">성별</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name="gender" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                          <span className="ml-2">남성</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="gender" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                          <span className="ml-2">여성</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                    <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="example@email.com"
                        value={passengerEmail}
                        onChange={(e) => setPassengerEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰 번호</label>
                    <input
                        type="tel"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="010-0000-0000"
                        value={passengerPhone}
                        onChange={(e) => {
                          // 숫자만 추출
                          let onlyNums = e.target.value.replace(/[^0-9]/g, '');
                          // 11자리까지만 허용
                          if (onlyNums.length > 11) onlyNums = onlyNums.slice(0, 11);

                          // 자동 하이픈 포맷팅
                          let formatted = onlyNums;
                          if (onlyNums.length > 3 && onlyNums.length <= 7) {
                            formatted = onlyNums.replace(/(\d{3})(\d{1,4})/, '$1-$2');
                          } else if (onlyNums.length > 7) {
                            formatted = onlyNums.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
                          }
                          setPassengerPhone(formatted);
                        }}
                    />
                  </div>
                </div>
              </div>

              {/* 약관 동의 */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">약관 동의</h2>
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                        type="checkbox"
                        className="h-5 w-5 mt-0.5 text-indigo-600 focus:ring-indigo-500"
                        checked={agreeTerms1}
                        onChange={() => setAgreeTerms1(!agreeTerms1)}
                    />
                    <span className="ml-2 text-sm">
                    <span className="font-semibold">[필수]</span> 항공권 구매 및 운송약관에 동의합니다.
                    <a href="#" className="text-indigo-600 ml-1 underline">약관 보기</a>
                  </span>
                  </label>
                  <label className="flex items-start">
                    <input
                        type="checkbox"
                        className="h-5 w-5 mt-0.5 text-indigo-600 focus:ring-indigo-500"
                        checked={agreeTerms2}
                        onChange={() => setAgreeTerms2(!agreeTerms2)}
                    />
                    <span className="ml-2 text-sm">
                    <span className="font-semibold">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                    <a href="#" className="text-indigo-600 ml-1 underline">약관 보기</a>
                  </span>
                  </label>
                  <label className="flex items-start">
                    <input
                        type="checkbox"
                        className="h-5 w-5 mt-0.5 text-indigo-600 focus:ring-indigo-500"
                        checked={agreeTerms3}
                        onChange={() => setAgreeTerms3(!agreeTerms3)}
                    />
                    <span className="ml-2 text-sm">
                    <span className="font-semibold">[필수]</span> 취소 및 환불 규정에 동의합니다.
                    <a href="#" className="text-indigo-600 ml-1 underline">규정 보기</a>
                  </span>
                  </label>
                  <label className="flex items-start">
                    <input type="checkbox" className="h-5 w-5 mt-0.5 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-sm">
                    <span>[선택]</span> 마케팅 정보 수신에 동의합니다.
                  </span>
                  </label>
                </div>
              </div>
            </div>

            {/* 결제 요약 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4">결제 요약</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">항공권 요금</span>
                    <span>₩ 450,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">세금 및 수수료</span>
                    <span>₩ 78,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">유류할증료</span>
                    <span>₩ 42,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">할인</span>
                    <span className="text-red-600">- ₩ 20,000</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-lg">
                    <span>총 결제 금액</span>
                    <span>₩ 550,000</span>
                  </div>
                </div>

                {/* 쿠폰 코드 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">프로모션 코드</label>
                  <div className="flex">
                    <input
                        type="text"
                        className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="코드 입력"
                    />
                    <button className="bg-indigo-600 text-white px-4 rounded-r-lg !rounded-button whitespace-nowrap cursor-pointer">
                      적용
                    </button>
                  </div>
                </div>

                <button
                    className={`w-full py-4 px-6 text-white font-bold rounded-lg !rounded-button whitespace-nowrap cursor-pointer ${allRequiredAgreed ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={!allRequiredAgreed}
                    onClick={PaymentComplete}
                >
                  결제하기
                </button>

                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>결제 진행 시 <a href="#" className="text-indigo-600">이용약관</a>에 동의하게 됩니다.</p>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h3 className="font-semibold mb-2">안내사항</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <i className="fas fa-info-circle text-indigo-600 mt-1 mr-2"></i>
                      <span>결제 완료 후 예약 확인서가 이메일로 발송됩니다.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-info-circle text-indigo-600 mt-1 mr-2"></i>
                      <span>국제선의 경우 여권 정보가 필요합니다.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-info-circle text-indigo-600 mt-1 mr-2"></i>
                      <span>문의사항은 고객센터(1588-0000)로 연락주세요.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default App;

