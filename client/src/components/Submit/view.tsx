import React from 'react';
import classNames from 'classnames';

import style from './style.module.scss';

interface IProps {
  text: string;
  className?: string;
}

export const Submit: React.FC<IProps> = ({
  text,
  className,
}) => {
  return (
    <button
      type='submit'
      className={classNames(style.submit, className)}
    >
      {text}
    </button>
  );
};
