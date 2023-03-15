import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from './model/store';

import { App } from './components';

import './index.scss';

const container = document.getElementById('root');

const root = createRoot(container!);

const store = Store();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
