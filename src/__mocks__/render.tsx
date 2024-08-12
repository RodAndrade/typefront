/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { FC, ReactElement, PropsWithChildren } from 'react';

import i18n from '@lib/i18n';
import { configure } from '@testing-library/dom';
import { render as TLRender, RenderOptions } from '@testing-library/react';
import { I18nContext } from 'react-i18next';

configure({});

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <I18nContext.Provider value={{ i18n }}>
      {children}
    </I18nContext.Provider>
  );
};

const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return TLRender(ui, { wrapper: AppWrapper, ...options });
};

export { render };