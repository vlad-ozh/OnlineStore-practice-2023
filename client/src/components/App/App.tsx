import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { navigationApi, userApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';
import { useDispatch } from 'react-redux';
import {
  NotFound,
  Home,
  Products,
  SearchProducts,
  Selected,
  Account,
  AccountLogin,
  AccountRegister,
  Cart,
  AccountInfo,
  AccountOrders,
  ForgotPassword,
  AccountResetPassword,
  OpenCategory,
  OpenProducts,
} from '../../screens';

import style from './style.module.scss';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userApi.refresh());
    }
  });

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
          path={navigationApi.routes.searchProducts}
          element={<SearchProducts />}
        />
        <Route
          path={navigationApi.routes.selected}
          element={<Selected />}
        />
        <Route
          path={navigationApi.routes.account}
          element={<Account />}
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
          path={navigationApi.routes.accountCart}
          element={<Cart />}
        />
        <Route
          path={navigationApi.routes.accountInfo}
          element={<AccountInfo />}
        />
        <Route
          path={navigationApi.routes.accountOrders}
          element={<AccountOrders />}
        />
        <Route
          path={navigationApi.routes.accountForgotPassword}
          element={<ForgotPassword />}
        />
        <Route
          path={navigationApi.routes.accountResetPassword}
          element={<AccountResetPassword />}
        />
        <Route
          path={navigationApi.routes.openProductsCategory}
          element={<OpenCategory />}
        />
        <Route
          path={navigationApi.routes.openProducts}
          element={<OpenProducts />}
        />
        <Route
          path='*' element={<NotFound />}
        />
      </Routes>
    </div>
  );
};

