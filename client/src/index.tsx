import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from './model/store';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

import { App } from './components';

import './index.scss';

const container = document.getElementById('root');

const root = createRoot(container!);

const store = Store();

root.render(
  <Suspense fallback={<>Loading...</>}>
    <Provider store={store}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  </Suspense>
);
