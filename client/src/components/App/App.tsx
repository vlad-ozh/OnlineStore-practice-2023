import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { navigationApi } from '../../model/navigationApi';

import {
  Home,
  Products,
  AccountLogin,
  AccountRegister,
  NotFound,
} from '../../screens';

import style from './style.module.scss';

export const App = () => {
  return (
    <div className={style.app}>
      <Routes>
        <Route
          path={navigationApi.routes.home}
          element={<Home />}
        />
        <Route
          path={navigationApi.routes.products}
          element={<Products />}
        />
        <Route
          path={navigationApi.routes.accountLogin}
          element={<AccountLogin />}
        />
        <Route
          path={navigationApi.routes.accountRegister}
          element={<AccountRegister />}
        />
        <Route
          path='*' element={<NotFound />}
        />
      </Routes>
    </div>
  );
};

