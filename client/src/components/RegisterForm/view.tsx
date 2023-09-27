import React from 'react';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { navigationApi, userApi } from '../../model/apis';
import { IUserRegisterConfirm } from '../../model/types/IUser';
import {
  FormError,
  InputWithLabel,
  Submit,
} from '..';

import style from './style.module.scss';

export const RegisterForm: React.FC = () => {
  const { error: formError } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const { t } = useTranslation(['authorization']);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IUserRegisterConfirm>({
    mode: 'onChange',
  });

  const passwordValue = watch('password');

  const onSubmit: SubmitHandler<IUserRegisterConfirm> = data => {
    const user = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    };

    dispatch(userApi.register(user));
    reset();
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={style.formTitle}>
          {t('registerTitle')}
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
          label='nameLabel'
          name='name'
          placeholder='namePlaceholder'
          type='text'
          autoComplete='on'
          register={register('name', {
            required: 'requiredError',
          })}
          error={errors.name?.message}
        />
        <InputWithLabel
          label='passwordRegisterLabel'
          name='password'
          placeholder={t('passwordPlaceholder')}
          type='password'
          autoComplete='off'
          register={register('password', {
            required: 'requiredError',
            minLength: {
              value: 4,
              message: 'minCharacters',
            },
            maxLength: {
              value: 20,
              message: 'maxCharacters',
            },
          })}
          error={errors.password?.message}
        />
        <InputWithLabel
          label='passwordConfirmLabel'
          name='confirmPassword'
          placeholder='passwordPlaceholder'
          type='password'
          autoComplete='off'
          register={register('confirmPassword', {
            required: 'requiredError',
            validate: (value: string) =>
              value === passwordValue || 'passNotMatchError',
          })}
          error={errors.confirmPassword?.message}
        />

        <Submit
          text={t('createSubmit')}
          className={style.formSubmit}
        />

        {formError &&
          <FormError error={formError} className={style.formError}/>
        }

        <p className={style.formParagraph}>
          {t('haveAcc')}
          <Link
            to={navigationApi.toAccountLogin()}
            className={style.formLink}
          >
            {t('login')}
          </Link>
        </p>
      </form>
    </div>
  );
};
