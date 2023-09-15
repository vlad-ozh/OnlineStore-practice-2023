import React from 'react';
import classnames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormError } from '../FormError';

import style from './style.module.scss';

interface IProps {
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

export const Textarea: React.FC<IProps> = ({
  register,
  placeholder,
  error,
  className,
}) => {
  return (
    <fieldset className={style.fieldset}>
      <textarea
        {...register}
        placeholder={placeholder}
        className={classnames(style.fieldsetTextarea, className)}
      />
      {error &&
        <FormError error={error} className={style.fieldsetTextareaError}/>
      }
    </fieldset>
  );
};
