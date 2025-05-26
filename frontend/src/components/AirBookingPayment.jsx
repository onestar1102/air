// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('항공권');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('신용카드');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passengerName, setPassengerName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [currentStep, setCurrentStep] = useState(2); // 1: 항공권 선택, 2: 탑승객 정보, 3: 결제, 4: 완료

    const navigate = useNavigate(); // 여기서 navigate를 선언!

    const FlightCheckout = () => {
        navigate("/FlightCheckout");
    };

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToPayment = () => {
    if (passengerName && passengerEmail && passengerPhone) {
      setCurrentStep(3);
      navigate("/FlightCheckout");
    }
  };

  const goToPassengerInfo = () => {
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 메뉴 */}
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
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                <i className="fas fa-user"></i>
              </div>
              <span className={`mt-2 text-sm ${currentStep === 2 ? 'font-semibold' : 'text-gray-600'}`}>탑승객 정보</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                <i className="fas fa-credit-card"></i>
              </div>
              <span className={`mt-2 text-sm ${currentStep === 3 ? 'font-semibold' : 'text-gray-600'}`}>결제</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 4 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
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
        
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 탑승객 정보 입력 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">탑승객 정보</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">탑승객 1 (성인)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">성명 (한글) <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="홍길동"
                          value={passengerName}
                          onChange={(e) => setPassengerName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">성명 (영문) <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="HONG GILDONG"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">여권에 표시된 이름과 동일하게 입력해주세요.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">생년월일 <span className="text-red-500">*</span></label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">성별 <span className="text-red-500">*</span></label>
                        <div className="flex space-x-4 mt-2">
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">국적 <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option>대한민국</option>
                            <option>일본</option>
                            <option>미국</option>
                            <option>중국</option>
                            <option>기타</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <i className="fas fa-chevron-down text-gray-400"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold mb-3">여권 정보</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">여권 번호 <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="M12345678"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">여권 만료일 <span className="text-red-500">*</span></label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">여행 종료일 기준으로 6개월 이상 유효해야 합니다.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">발행 국가 <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option>대한민국</option>
                            <option>일본</option>
                            <option>미국</option>
                            <option>중국</option>
                            <option>기타</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <i className="fas fa-chevron-down text-gray-400"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold mb-3">연락처 정보</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이메일 <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="example@email.com"
                          value={passengerEmail}
                          onChange={(e) => setPassengerEmail(e.target.value)}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">예약 확인서가 이메일로 발송됩니다.</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">휴대폰 번호 <span className="text-red-500">*</span></label>
                        <input
                          type="tel"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="010-0000-0000"
                          value={passengerPhone}
                          onChange={(e) => setPassengerPhone(e.target.value)}
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">여행 관련 중요 정보가 SMS로 발송됩니다.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold mb-3">추가 요청사항 (선택)</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">특별 요청</label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        rows={3}
                        placeholder="특별 식단, 휠체어 지원 등 필요한 사항을 입력해주세요."
                      ></textarea>
                      <p className="text-xs text-gray-500 mt-1">요청사항은 가능한 범위 내에서 제공됩니다.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">마일리지 적립</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">마일리지 적립 여부</label>
                    <div className="flex space-x-4 mt-2">
                      <label className="flex items-center">
                        <input type="radio" name="mileage" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                        <span className="ml-2">적립함</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="mileage" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                        <span className="ml-2">적립하지 않음</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">마일리지 회원 번호</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="마일리지 회원 번호를 입력하세요"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">여행 보험</h2>
                <div className="space-y-4">
                  <div className="flex items-start p-4 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      id="insurance"
                      className="h-5 w-5 mt-1 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="ml-3">
                      <label htmlFor="insurance" className="font-medium">여행 보험 추가 (₩ 30,000)</label>
                      <p className="text-sm text-gray-600 mt-1">여행 취소, 수하물 분실, 의료 지원 등을 포함한 종합 보험입니다.</p>
                      <a href="#" className="text-indigo-600 text-sm mt-1 inline-block">자세히 보기</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                    onClick={goToPayment}
                  className={`py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer ${(!passengerName || !passengerEmail || !passengerPhone) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!passengerName || !passengerEmail || !passengerPhone}
                >
                  다음: 결제 정보 입력 <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
            
            {/* 예약 요약 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4">예약 요약</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Minimalist%20airline%20logo%20with%20blue%20and%20white%20colors%2C%20professional%20corporate%20design%20for%20an%20Asian%20airline%20company%2C%20clean%20and%20modern%20look%2C%20suitable%20for%20business%20context&width=60&height=60&seq=1&orientation=squarish" 
                      alt="Shinguair Logo" 
                      className="w-12 h-12 mr-3 object-contain"
                    />
                    <div>
                      <p className="font-bold">Shinguair</p>
                      <p className="text-sm text-gray-600">항공편: SG1234</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-bold text-lg">ICN</p>
                        <p className="text-sm text-gray-600">서울</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-xs text-gray-500">직항</p>
                        <div className="relative w-20 h-0.5 bg-gray-300 my-1">
                          <div className="absolute -top-1.5 right-0">
                            <i className="fas fa-plane text-indigo-600"></i>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">2시간 30분</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">NRT</p>
                        <p className="text-sm text-gray-600">도쿄</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <p>08:30</p>
                      <p>11:00</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">2025년 5월 25일, 일요일</p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-bold text-lg">NRT</p>
                        <p className="text-sm text-gray-600">도쿄</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-xs text-gray-500">직항</p>
                        <div className="relative w-20 h-0.5 bg-gray-300 my-1">
                          <div className="absolute -top-1.5 right-0">
                            <i className="fas fa-plane text-indigo-600"></i>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">2시간 30분</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">ICN</p>
                        <p className="text-sm text-gray-600">서울</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <p>19:45</p>
                      <p>22:15</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">2025년 5월 30일, 금요일</p>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">승객</span>
                      <span>성인 1명</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">좌석 등급</span>
                      <span>이코노미</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">수하물</span>
                      <span>1개 (23kg)</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">항공권 요금</span>
                      <span>₩ 450,000</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">세금 및 수수료</span>
                      <span>₩ 78,000</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">유류할증료</span>
                      <span>₩ 42,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">할인</span>
                      <span className="text-red-600">- ₩ 20,000</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>총 금액</span>
                      <span>₩ 550,000</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h3 className="font-semibold mb-2">안내사항</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <i className="fas fa-info-circle text-indigo-600 mt-1 mr-2"></i>
                      <span>탑승 시 여권 정보와 일치하는 신분증을 지참해주세요.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-info-circle text-indigo-600 mt-1 mr-2"></i>
                      <span>출발 2시간 전까지 공항에 도착하시기 바랍니다.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-info-circle text-indigo-600 mt-1 mr-2"></i>
                      <span>일본 입국 시 필요한 서류를 확인해주세요.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
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
                        placeholder="0000-0000-0000-0000"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">유효 기간</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">카드 소유자 이름</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="카드에 표시된 이름"
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
              
              {/* 탑승객 정보 요약 */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">탑승객 정보</h2>
                  <button 
                    onClick={goToPassengerInfo}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    <i className="fas fa-edit mr-1"></i> 수정
                  </button>
                </div>
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <p className="font-semibold">탑승객 1: {passengerName || '홍길동'}</p>
                  <p className="text-sm text-gray-600 mt-1">이메일: {passengerEmail || 'example@email.com'}</p>
                  <p className="text-sm text-gray-600 mt-1">연락처: {passengerPhone || '010-0000-0000'}</p>
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
                      checked={agreeTerms}
                      onChange={() => setAgreeTerms(!agreeTerms)}
                    />
                    <span className="ml-2 text-sm">
                      <span className="font-semibold">[필수]</span> 항공권 구매 및 운송약관에 동의합니다.
                      <a href="#" className="text-indigo-600 ml-1 underline">약관 보기</a>
                    </span>
                  </label>
                  <label className="flex items-start">
                    <input type="checkbox" className="h-5 w-5 mt-0.5 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-sm">
                      <span className="font-semibold">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                      <a href="#" className="text-indigo-600 ml-1 underline">약관 보기</a>
                    </span>
                  </label>
                  <label className="flex items-start">
                    <input type="checkbox" className="h-5 w-5 mt-0.5 text-indigo-600 focus:ring-indigo-500" />
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
                  className={`w-full py-4 px-6 text-white font-bold rounded-lg !rounded-button whitespace-nowrap cursor-pointer ${agreeTerms ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
                  disabled={!agreeTerms}
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
        )}
      </main>
    </div>
  );
};

export default App;

