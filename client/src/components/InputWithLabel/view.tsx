import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import style from './style.module.scss';
import { FormError } from '../FormError';

interface IProps {
  label: string;
  name: string;
  placeholder: string;
  type: 'email' | 'text' | 'tel' | 'password';
  autoComplete: 'on' | 'off';
  register: UseFormRegisterReturn;
  error?: string;
}

export const InputWithLabel: React.FC<IProps> = ({
  label,
  name,
  placeholder,
  type,
  autoComplete,
  register,
  error,
}) => {
  const { t } = useTranslation(['authorization']);

  return (
    <fieldset className={style.fieldset}>
      <label htmlFor={name} className={style.fieldsetLabel}>{t(label)}</label>
      <input
        {...register}
        type={type}
        id={name}
        name={name}
        placeholder={`${t(placeholder)}`}
        autoComplete={autoComplete}
        className={style.fieldsetInput}
      />
      {error && <FormError error={error} className={style.fieldsetInputError}/>}
    </fieldset>
  );
};
