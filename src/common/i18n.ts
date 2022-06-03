import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import translationEN from './locales/en/translation.json';
import translationVN from './locales/vn/translation.json';
import translationPL from './locales/pl/translation.json';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    vn: {
        translation: translationVN
    },
    pl: {
        translation: translationPL
    }
};
i18n
    .use(Backend)
    .use(initReactI18next)
    .init(
        {
            resources,
            fallbackLng: 'en',
            debug: true,
            interpolation: {
                escapeValue: false
            }
        },
    );
export default i18n;
