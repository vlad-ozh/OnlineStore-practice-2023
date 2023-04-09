import React from 'react';

import style from './style.module.scss';

export const Footer = () => {

  const getCurrentYear = () => {
    const date = new Date();

    return date.getFullYear();
  };

  return (
    <div className={style.footer}>
      <h3 className={style.footerTittle}>© {getCurrentYear()}</h3>
    </div>
  );
};
