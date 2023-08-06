import React from 'react';
import { Link } from 'react-router-dom';
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IUserLogin } from '../../model/types/IUser';
import {
  FormError,
  InputWithLabel,
  Submit,
} from '..';

import style from './style.module.scss';

interface IProps {
  register: UseFormRegister<IUserLogin>;
  errors: FieldErrors<IUserLogin>;
  formError: string | null;
  registerLink: string;
  forgotPasswordLink: string;
  handleSubmit: UseFormHandleSubmit<IUserLogin, undefined>;
  onSubmit: SubmitHandler<IUserLogin>;
}

export const LoginForm: React.FC<IProps> = ({
  register,
  errors,
  registerLink,
  forgotPasswordLink,
  formError,
  handleSubmit,
  onSubmit,
}) => {
  const { t } = useTranslation(['authorization']);

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={style.formTitle}>
          {t('loginTitle')}
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
        <InputWithLabel
          label='passwordLabel'
          name='password'
          placeholder={t('passwordPlaceholder')}
          type='password'
          register={register('password', {
            required: 'requiredError',
          })}
          error={errors.password?.message}
        />

        <Submit
          text={t('loginSubmit')}
          className={style.formSubmit}
        />

        {formError &&
          <FormError error={formError} className={style.formError}/>
        }

        <p className={style.formParagraph}>
          {t('dontHaveAcc')}
          <Link
            to={registerLink}
            className={style.formLink}
          >
            {t('register')}
          </Link>
        </p>
        <p className={style.formParagraph}>
          <Link
            to={forgotPasswordLink}
            className={style.formLink}
          >
            {t('forgotPassword')}
          </Link>
        </p>
      </form>
    </div>
  );
};
