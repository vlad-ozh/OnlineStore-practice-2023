import React from 'react';
import classnames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import style from './style.module.scss';

interface IInputProps {
  name: string;
  type: 'text';
  placeholder: string;
  register: UseFormRegisterReturn;
  className?: string;
}

export const Input: React.FC<IInputProps> = ({
  type,
  name,
  register,
  placeholder,
  className,
}) => {
  const { t } = useTranslation(['authorization']);

  return (
    <input
      {...register}
      type={type}
      name={name}
      id={name}
      placeholder={`${t(placeholder)}`}
      className={classnames(style.input, className)}
    />
  );
};
