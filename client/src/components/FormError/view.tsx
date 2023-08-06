import React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import style from './style.module.scss';

interface IProps {
  error: string;
  className?: string;
}

export const FormError: React.FC<IProps> = ({
  error,
  className,
}) => {
  const { t } = useTranslation(['authorization']);

  return (
    <h4 className={classnames(style.error, className)}>
      {t(error)}
    </h4>
  );
};
