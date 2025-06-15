import React, { useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { BedDouble, Car, Search, ChevronDown } from 'lucide-react';

const MainPage = ({ setSearchData }) => {
  const { t } = useTranslation();

  // ✅ 사용자 API 방식 유지
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

        {/* 상단 카테고리 버튼 */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#002d63] text-white rounded-xl shadow-md hover:brightness-110">
            <BedDouble className="w-5 h-5" />
            {t('mainPage.categories.hotel')}
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#002d63] text-white rounded-xl shadow-md hover:brightness-110">
            <Car className="w-5 h-5" />
            {t('mainPage.categories.rentcar')}
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#002d63] text-white rounded-xl shadow-md hover:brightness-110">
            <Search className="w-5 h-5" />
            {t('mainPage.categories.searchAnywhere')}
          </button>
        </div>

        {/* Drops 프로모션 영역 */}
        <div className="rounded-2xl overflow-hidden bg-[#f3f3f3]">
          <div className="flex flex-col md:flex-row">
            <div className="p-6 md:p-10 flex flex-col justify-center bg-[#ffe1e1] md:w-1/2">
              <p className="font-semibold mb-2">{t('mainPage.promotion.subtitle')}</p>
              <h2 className="text-3xl font-bold mb-4 leading-snug">{t('mainPage.promotion.title')}</h2>
              <p className="mb-4">{t('mainPage.promotion.description')}</p>
              <button className="btn btn-sm bg-black text-white rounded-full w-fit px-5 shadow">
                {t('mainPage.promotion.button')}
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                  src="/img/shinguair.jpg"
                  alt="Drops Promotion"
                  className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        {/* FAQ 섹션 */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{t('mainPage.faq.title')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {t('mainPage.faq.questions', { returnObjects: true }).map((q, i) => (
                <div key={i} className="flex justify-between items-center border p-3 rounded-md">
                  <span>{q}</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
            ))}
          </div>
        </div>

        {/* 전 세계 사이트 */}
        <div>
          <h2 className="text-xl font-bold">{t('mainPage.globalSites.title')}</h2>
          <div className="border-t mt-2" />
        </div>

        {/* 여행 계획 섹션 */}
        <div>
          <h2 className="text-xl font-bold mb-4">{t('mainPage.planTrip.title')}</h2>
          <div className="flex gap-2 mb-4">
            {t('mainPage.planTrip.filters', { returnObjects: true }).map((label, idx) => (
                <button
                    key={idx}
                    className={`btn btn-sm rounded-full px-4 ${idx === 0 ? 'btn-neutral text-white' : 'btn-outline'}`}
                >
                  {label}
                </button>
            ))}
          </div>
          <div className="grid md:grid-cols-5 gap-4 text-sm text-blue-600">
            {t('mainPage.planTrip.items', { returnObjects: true }).map((group, idx) => (
                <div key={idx} className="space-y-1">
                  {group.map((item, j) => (
                      <p key={j}>{item}</p>
                  ))}
                </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-1">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-gray-800' : 'bg-gray-300'}`}
                />
            ))}
          </div>
        </div>
      </div>
  );
};

export default MainPage;
