import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      de: { translation: require('./locales/de.json'), },
      'en-GB': { translation: require('./locales/en-GB.json'), },
    },
  });

export default i18n;
