// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      "navbar": {
        "title": "My Navbar",
        "toggle": "Toggle Language"
      }
    }
  },
  bn: {
    translation: {
      "navbar": {
        "title": "আমার ন্যাভবার",
        "toggle": "ভাষা পরিবর্তন করুন"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
