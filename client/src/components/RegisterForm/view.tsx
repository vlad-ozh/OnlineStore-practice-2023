import React from 'react';
import { Link } from 'react-router-dom';
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormError,
  InputWithLabel,
  Submit,
} from '..';
import { IUserRegisterConfirm } from '../../model/types/IUser';

import style from './style.module.scss';

interface IProps {
  register: UseFormRegister<IUserRegisterConfirm>;
  errors: FieldErrors<IUserRegisterConfirm>;
  formError: string | null;
  passwordValue: string;
  loginLink: string;
  handleSubmit: UseFormHandleSubmit<IUserRegisterConfirm, undefined>;
  onSubmit: SubmitHandler<IUserRegisterConfirm>;
}

export const RegisterForm: React.FC<IProps> = ({
  register,
  errors,
  passwordValue,
  loginLink,
  formError,
  handleSubmit,
  onSubmit,
}) => {
  const { t } = useTranslation(['authorization']);

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
            to={loginLink}
            className={style.formLink}
          >
            {t('login')}
          </Link>
        </p>
      </form>
    </div>
  );
};
