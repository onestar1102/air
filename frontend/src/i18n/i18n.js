import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import koTranslation from "../locales/ko/translation.json";
import enTranslation from "../locales/en/translation.json";
import jaTranslation from "../locales/ja/translation.json";

i18n
    .use(LanguageDetector) // 브라우저 언어 감지
    .use(initReactI18next)
    .init({
        resources: {
            ko: { translation: koTranslation },
            en: { translation: enTranslation },
            ja: { translation: jaTranslation },
        },
        fallbackLng: "ko",
        debug: process.env.NODE_ENV === "development", // 개발 시 디버깅 활성화

        interpolation: {
            escapeValue: false,
        },

        detection: {
            order: ["localStorage", "navigator"], // 우선순위 설정
            caches: ["localStorage"], // 감지된 언어를 저장
        },
    });

export default i18n;
