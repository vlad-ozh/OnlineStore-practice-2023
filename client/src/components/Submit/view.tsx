import React from 'react';
import classnames from 'classnames';

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
      className={classnames(style.submit, className)}
    >
      {text}
    </button>
  );
};
