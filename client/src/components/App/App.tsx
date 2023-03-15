import React from 'react';
import { Route, Routes } from 'react-router-dom';

import style from './style.module.scss';

import {
  Home,
  NotFound,
} from '../../screens';

export const App = () => {
  return (
    <div className={style.app}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

