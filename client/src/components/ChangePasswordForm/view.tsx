import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userApi } from '../../model/apis';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IUserChangePasswordForm } from '../../model/types/IUser';
import { userActions } from '../../model/store/reducers/UserSlice';
import {
  Button,
  FormError,
  InputWithLabel,
  Submit,
} from '..';

import style from './style.module.scss';

export const ChangePasswordForm: React.FC = () => {
  const {
    user: { id: userId },
    error: formError,
  } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const { t } = useTranslation(['account']);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<IUserChangePasswordForm>({ mode: 'onChange' });

  const passwordValue = watch('currentPassword');
  const newPasswordValue = watch('newPassword');

  const onCancel = () => {
    reset();
    clearErrors();
    dispatch(userActions.clearError());
  };

  const onSubmit: SubmitHandler<IUserChangePasswordForm> = (data) => {
    dispatch(userApi.changeUserPassword({
      userId,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    }));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.formPasswordFields}>
        <h3 className={style.formPasswordTitle}>{t('changePasswordTitle')}</h3>
        <InputWithLabel
          label='currentPasswordLabel'
          name='currentPassword'
          placeholder='passwordPlaceholder'
          type='password'
          autoComplete='on'
          register={register('currentPassword', {
            required: 'requiredError',
          })}
          error={errors.currentPassword?.message}
        />
        <InputWithLabel
          label='newPasswordLabel'
          name='newPassword'
          placeholder={'newPasswordPlaceholder'}
          type='password'
          autoComplete='off'
          register={register('newPassword', {
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
          error={errors.newPassword?.message}
        />
        <InputWithLabel
          label='passwordConfirmLabel'
          name='confirmNewPassword'
          placeholder='newPasswordPlaceholder'
          type='password'
          autoComplete='off'
          register={register('confirmNewPassword', {
            required: 'requiredError',
            validate: (value: string) =>
              value === newPasswordValue || 'passNotMatchError',
          })}
          error={errors.confirmNewPassword?.message}
        />
      </div>
      <div className={style.formActions}>
        {passwordValue && <div className={style.formButtons}>
          <Button
            skin='text'
            size='medium'
            onClick={onCancel}
            className={style.formButton}
          >
            {t('cancelSubmit')}
          </Button>

          <Submit
            text={t('saveSubmit')}
            className={style.formSubmit}
          />
        </div>}
        {formError &&
          <FormError error={formError} className={style.formError}/>
        }
      </div>
    </form>
  );
};
