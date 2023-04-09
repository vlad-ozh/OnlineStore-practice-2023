import React from 'react';

import style from './style.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loader} />
    </div>
  );
};
