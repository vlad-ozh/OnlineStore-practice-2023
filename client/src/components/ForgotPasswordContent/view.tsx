import React from 'react';
import { ForgotPasswordForm, ForgotPasswordFormSent } from '..';
import { IUserForgotPassword } from '../../model/types/IUser';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userApi } from '../../model/apis';
import { userActions } from '../../model/store/reducers/UserSlice';

export const ForgotPasswordContent: React.FC = () => {

  const {
    error: formError,
    isEmailSent,
  } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IUserForgotPassword>({
    mode: 'onChange',
  });

  const email = getValues('email');

  const onSubmit: SubmitHandler<IUserForgotPassword> = data => {
    const user = {
      email: data.email.trim(),
    };

    dispatch(userApi.forgotPassword(user));
  };

  const onBack = () => {
    dispatch(userActions.emailSentDisable());
  };

  if (isEmailSent) {
    return (
      <ForgotPasswordFormSent
        email={email}
        onBack={onBack}
      />
    );
  }

  return (
    <ForgotPasswordForm
      register={register}
      errors={errors}
      formError={formError}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  );
};
