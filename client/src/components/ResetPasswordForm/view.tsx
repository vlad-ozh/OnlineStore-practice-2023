import React from 'react';
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IUserResetPasswordData } from '../../model/types/IUser';
import {
  FormError,
  InputWithLabel,
  Submit,
} from '..';

import style from './style.module.scss';

interface IProps {
  register: UseFormRegister<IUserResetPasswordData>;
  errors: FieldErrors<IUserResetPasswordData>;
  formError: string | null;
  passwordValue: string;
  handleSubmit: UseFormHandleSubmit<IUserResetPasswordData, undefined>;
  onSubmit: SubmitHandler<IUserResetPasswordData>;
}

export const ResetPasswordForm: React.FC<IProps> = ({
  register,
  errors,
  formError,
  passwordValue,
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
