import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userApi } from '../../model/apis';
import { IUserResetPasswordData } from '../../model/types/IUser';
import {
  FormError,
  InputWithLabel,
  Submit,
} from '..';

import style from './style.module.scss';

interface IProps {
  tokenParam: string | undefined;
}

export const ResetPasswordForm: React.FC<IProps> = ({ tokenParam }) => {
  const { t } = useTranslation(['authorization']);

  const {
    error: formError,
    isToken,
  } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IUserResetPasswordData>({
    mode: 'onChange',
  });
  const passwordValue = watch('password');

  const onSubmit: SubmitHandler<IUserResetPasswordData> = data => {
    if (typeof tokenParam === 'string') {
      const user = {
        password: data.password.trim(),
        isToken,
        token: tokenParam,
      };

      dispatch(userApi.resetPassword(user));
      reset();
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={style.formTitle}>
          {t('resetTitle')}
        </h2>

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
          text={t('resetSubmit')}
          className={style.formSubmit}
        />

        {formError &&
          <FormError error={formError} className={style.formError}/>
        }
      </form>
    </div>
  );
};
