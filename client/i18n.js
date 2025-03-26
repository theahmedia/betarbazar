import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'search': 'Search',
      'account': 'Account',
      'cart': 'Cart',
      'welcome': 'Welcome',
      'login': 'Login',
      'register': 'Register',
      'logout': 'Logout',
    }
  },
  bn: {
    translation: {
      'search': 'অনুসন্ধান',
      'account': 'অ্যাকাউন্ট',
      'cart': 'কার্ট',
      'welcome': 'স্বাগতম',
      'login': 'লগইন',
      'register': 'নিবন্ধন',
      'logout': 'লগআউট',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
