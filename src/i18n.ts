import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languagedetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: 'es',
        debug: import.meta.env.DEV,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        // Supported languages
        supportedLngs: ['es', 'en', 'pt'],

        // Path to load translations
        backend: {
            loadPath: import.meta.env.BASE_URL + 'locales/{{lng}}/{{ns}}.json',
        },

        // Namespaces
        ns: ['common', 'landing', 'tour', 'releases', 'docs', 'about', 'legal', 'roadmap', 'notfound', 'blog'],
        defaultNS: 'common'
    });

export default i18n;
