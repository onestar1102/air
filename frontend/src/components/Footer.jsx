import React from "react";
import { useTranslation } from "react-i18next"; // ✅ 다국어 훅 추가

export default function Footer() {
  const { t } = useTranslation(); // ✅ 다국어 훅 사용

  return (
      <footer className="bg-[#03284F] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* ✅ 브랜드 설명 */}
            <div>
              <h3 className="text-xl font-bold mb-4">{t("footer.brand.name")}</h3>
              <p className="text-gray-400 mb-4">{t("footer.brand.description")}</p>
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

            {/* ✅ 회사 정보 섹션 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.company.title")}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white cursor-pointer">{t("footer.company.about")}</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">{t("footer.company.newsroom")}</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">{t("footer.company.careers")}</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">{t("footer.company.investors")}</a></li>
              </ul>
            </div>

            {/* ✅ 고객 지원 섹션 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.support.title")}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white cursor-pointer">{t("footer.support.faq")}</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">{t("footer.support.manageBooking")}</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">{t("footer.support.refundPolicy")}</a></li>
                <li><a href="#" className="hover:text-white cursor-pointer">{t("footer.support.customerService")}</a></li>
              </ul>
            </div>

            {/* ✅ 연락처 섹션 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t("footer.contact.title")}</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                  <span>{t("footer.contact.address")}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-phone-alt mt-1 mr-2"></i>
                  <span>{t("footer.contact.phone")}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-envelope mt-1 mr-2"></i>
                  <span>{t("footer.contact.email")}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ✅ 하단 카피라이트 */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
  );
}
