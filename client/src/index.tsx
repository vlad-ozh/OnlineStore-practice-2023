import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Store } from './model/store';
import { App } from './components';

import './index.scss';

const container = document.getElementById('root');

const root = createRoot(container!);

const store = Store();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
