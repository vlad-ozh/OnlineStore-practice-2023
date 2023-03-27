import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    ns: ['header'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{ns}}/{{lng}}.json',
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
