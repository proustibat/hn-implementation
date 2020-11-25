import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';
import backend from 'i18next-xhr-backend';

i18n
  .use(languageDetector)
  .use(backend)
  .use(initReactI18next)
  .init({
    fallbackLng: ['en'],
    defaultNS: 'translation',
    nsSeparator: false,
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    debug: process.env.DEBUG === 'true',
  });

export default i18n;
