import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from './model/store';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

import { App, Loader } from './components';

import './index.scss';

const container = document.getElementById('root');

const root = createRoot(container!);

const store = Store();

root.render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </Suspense>
);
