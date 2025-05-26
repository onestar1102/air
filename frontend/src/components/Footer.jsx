import React from "react";

export default function Footer() {
  return (
      <footer className="bg-[#03284F] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Shinguair</h3>
              <p className="text-gray-400 mb-4">최고의 서비스로 편안한 여행을 제공합니다.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">회사 정보</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white cursor-pointer">회사 소개</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">뉴스룸</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">채용 정보</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">투자자 정보</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">고객 지원</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white cursor-pointer">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">예약 관리</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">환불 정책</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">고객센터</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">연락처</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                  <span>서울특별시 강남구 테헤란로 123</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-phone-alt mt-1 mr-2"></i>
                  <span>1588-0000</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-envelope mt-1 mr-2"></i>
                  <span>support@shinguair.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Shinguair. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>

  );
}
