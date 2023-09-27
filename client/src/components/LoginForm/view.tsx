import React from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { navigationApi, userApi } from '../../model/apis';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { IUserLogin } from '../../model/types/IUser';
import {
  FormError,
  InputWithLabel,
  Submit,
} from '..';

import style from './style.module.scss';

export const LoginForm: React.FC = () => {
  const { error: formError } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const { t } = useTranslation(['authorization']);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IUserLogin>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IUserLogin> = data => {
    const user = {
      email: data.email.trim(),
      password: data.password.trim(),
    };

    dispatch(userApi.login(user));
    resetField('password');
  };


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
          autoComplete='on'
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
          autoComplete='off'
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
            to={navigationApi.toAccountRegister()}
            className={style.formLink}
          >
            {t('register')}
          </Link>
        </p>
        <p className={style.formParagraph}>
          <Link
            to={navigationApi.toAccountForgotPassword()}
            className={style.formLink}
          >
            {t('forgotPassword')}
          </Link>
        </p>
      </form>
    </div>
  );
};
