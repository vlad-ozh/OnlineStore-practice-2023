import React from 'react';

import style from './style.module.scss';
import { Home } from '../../screens/home';

export const App = () => {
  return (
    <div className={style.app}>
      <Home />
    </div>
  );
};

