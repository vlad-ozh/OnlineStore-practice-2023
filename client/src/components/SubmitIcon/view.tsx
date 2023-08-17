import React, { ReactNode } from 'react';
import classnames from 'classnames';

import style from './style.module.scss';

interface IProps {
  icon: ReactNode;
  className?: string;
}

export const SubmitIcon: React.FC<IProps> = ({
  icon,
  className,
}) => {
  return (
    <button
      type='submit'
      className={classnames(style.submit, className)}
    >
      {icon}
    </button>
  );
};
