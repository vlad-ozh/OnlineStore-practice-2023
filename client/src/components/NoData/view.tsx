import React from 'react';

import style from './style.module.scss';

interface IProps {
  text: string;
}

export const NoData: React.FC<IProps> = ({ text }) => {
  return (
    <h3 className={style.noData}>
      {text}
    </h3>
  );
};
