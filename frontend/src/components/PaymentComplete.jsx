// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const App = () => {
const [paymentComplete, setPaymentComplete] = useState(true);
return (
<div className="min-h-screen bg-gray-50">
{/* Header */}
{/* Main Content */}
<main className="container mx-auto py-12 px-4">
<div className="max-w-3xl mx-auto">
{/* Travel Information */}
<div className="bg-white rounded-lg shadow-md p-6 mb-8">
<h2 className="text-xl font-bold mb-4">여행 정보</h2>
<div className="space-y-6">
<div className="flex flex-col md:flex-row md:items-center gap-4 pb-4 border-b border-gray-200">
<div className="flex-shrink-0">
<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
<i className="fas fa-plane-departure text-2xl"></i>
</div>
</div>
<div className="flex-grow">
<div className="flex flex-col md:flex-row md:justify-between md:items-center">
<div>
<p className="font-bold text-lg">서울 (ICN) → 도쿄 (NRT)</p>
<p className="text-gray-600">2025년 5월 25일, 일요일 • 08:30</p>
</div>
<div className="mt-2 md:mt-0">
<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">출국</span>
</div>
</div>
</div>
</div>
<div className="flex flex-col md:flex-row md:items-center gap-4">
<div className="flex-shrink-0">
<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
<i className="fas fa-plane-arrival text-2xl"></i>
</div>
</div>
<div className="flex-grow">
<div className="flex flex-col md:flex-row md:justify-between md:items-center">
<div>
<p className="font-bold text-lg">도쿄 (NRT) → 서울 (ICN)</p>
<p className="text-gray-600">2025년 5월 30일, 금요일 • 19:45</p>
</div>
<div className="mt-2 md:mt-0">
<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">귀국</span>
</div>
</div>
</div>
</div>
</div>
</div>
{/* Passenger Information */}
<div className="bg-white rounded-lg shadow-md p-6 mb-8">
<h2 className="text-xl font-bold mb-4">탑승객 정보</h2>
<div className="space-y-4">
<div className="flex justify-between pb-2 border-b border-gray-200">
<span className="text-gray-600">성명</span>
<span className="font-semibold">홍길동</span>
</div>
<div className="flex justify-between pb-2 border-b border-gray-200">
<span className="text-gray-600">이메일</span>
<span className="font-semibold">example@email.com</span>
</div>
<div className="flex justify-between pb-2 border-b border-gray-200">
<span className="text-gray-600">휴대폰 번호</span>
<span className="font-semibold">010-0000-0000</span>
</div>
<div className="flex justify-between">
<span className="text-gray-600">좌석 등급</span>
<span className="font-semibold">이코노미</span>
</div>
</div>
</div>
{/* Payment Success Message */}
<div className="bg-white rounded-lg shadow-md p-8 text-center">
<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
<i className="fas fa-check text-3xl text-green-600"></i>
</div>
<h2 className="text-2xl font-bold mb-4">결제가 완료되었습니다</h2>
<p className="text-gray-600 mb-6">예약 확인 이메일이 example@email.com으로 발송되었습니다.</p>
<div className="border-t border-b border-gray-200 py-6 my-6">
<h3 className="text-xl font-bold mb-4">결제 요약</h3>
<div className="max-w-md mx-auto">
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
<div className="flex justify-between mb-2">
<span className="text-gray-600">할인</span>
<span className="text-red-600">- ₩ 20,000</span>
</div>
<div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
<span>총 결제 금액</span>
<span>₩ 550,000</span>
</div>
</div>
</div>
<div className="flex flex-col md:flex-row justify-center gap-4">
<button className="bg-indigo-600 text-white py-3 px-6 rounded-lg !rounded-button whitespace-nowrap cursor-pointer hover:bg-indigo-700">
예약 상세 보기
</button>
<button className="bg-white text-indigo-600 border border-indigo-600 py-3 px-6 rounded-lg !rounded-button whitespace-nowrap cursor-pointer hover:bg-indigo-50">
    <a href="http://localhost:3000/">홈으로 돌아가기</a>
</button>
</div>
</div>
{/* Additional Information */}
<div className="bg-white rounded-lg shadow-md p-6 mb-8">
<h2 className="text-xl font-bold mb-4">추가 정보</h2>
<div className="space-y-3">
<div className="flex items-start">
<i className="fas fa-info-circle text-indigo-600 mt-1 mr-3"></i>
<p className="text-gray-600">체크인은 출발 24시간 전부터 가능합니다.</p>
</div>
<div className="flex items-start">
<i className="fas fa-info-circle text-indigo-600 mt-1 mr-3"></i>
<p className="text-gray-600">수하물은 1인당 23kg 1개까지 무료로 제공됩니다.</p>
</div>
<div className="flex items-start">
<i className="fas fa-info-circle text-indigo-600 mt-1 mr-3"></i>
<p className="text-gray-600">문의사항은 고객센터(1588-0000)로 연락주세요.</p>
</div>
</div>
</div>
</div>
</main>
{/* Footer */}
<footer className="bg-gray-800 text-white py-8 mt-12">
<div className="container mx-auto px-4">
<div className="text-center text-gray-400 text-sm">
<p>© 2025 Shinguair. 모든 권리 보유.</p>
</div>
</div>
</footer>
</div>
);
};
export default App
