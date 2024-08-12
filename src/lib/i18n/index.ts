import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

export { changeLanguage } from 'i18next';
export type { Callback, TFunction } from 'i18next';

export { Trans, useTranslation, withTranslation } from 'next-i18next';
export type { WithTranslation } from 'next-i18next';

import en from './locales/en';
import ptBR from './locales/pt-br';

export const languages = {
  'en': en,
  'pt-BR': ptBR,
};

const options: InitOptions = {
  resources: languages,
  fallbackLng: ['pt-BR', 'en'],
  supportedLngs: ['pt-BR', 'en'],
  load: 'currentOnly',
  defaultNS: 'common',
  react: { useSuspense: false },
};

if (i18n.isInitialized) {
  Object.entries(options.resources ?? {}).forEach((parent) => {
    const lng = parent[0];
    Object.entries(parent[1]).forEach((child) => {
      const { [0]: namespace, [1]: resource } = child;
      i18n.addResourceBundle(lng, namespace, resource);
    });
  });
} else {
  i18n.use(detector).use(initReactI18next).init(options);
}

export default i18n;
