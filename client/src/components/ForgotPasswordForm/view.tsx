import React from 'react';
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IUserForgotPassword } from '../../model/types/IUser';
import {
  FormError,
  InputWithLabel,
  Submit,
} from '..';

import style from './style.module.scss';

interface IProps {
  register: UseFormRegister<IUserForgotPassword>;
  errors: FieldErrors<IUserForgotPassword>;
  formError: string | null;
  handleSubmit: UseFormHandleSubmit<IUserForgotPassword, undefined>;
  onSubmit: SubmitHandler<IUserForgotPassword>;
}

export const ForgotPasswordForm: React.FC<IProps> = ({
  register,
  errors,
  formError,
  handleSubmit,
  onSubmit,
}) => {
  const { t } = useTranslation(['authorization']);

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={style.formTitle}>
          {t('resetTitle')}
        </h2>

        <InputWithLabel
          label='emailLabel'
          name='email'
          placeholder='emailPlaceholder'
          type='email'
          register={register('email', {
            required: 'requiredError',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: 'validationEmailError',
            },
          })}
          error={errors.email?.message}
        />

        <Submit
          text={t('sendEmailSubmit')}
          className={style.formSubmit}
        />

        {formError &&
          <FormError error={formError} className={style.formError}/>
        }
      </form>
    </div>
  );
};
