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
    emailForForgotPassword: email,
    isEmailSent,
  } = useAppSelector((state) => state.userApi);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForgotPassword>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IUserForgotPassword> = data => {
    const trimEmail = data.email.trim();

    dispatch(userActions.changeEmailForForgotPassword(trimEmail));

    const user = {
      email: trimEmail,
    };

    dispatch(userApi.forgotPassword(user));
  };

  const onBack = () => {
    dispatch(userActions.emailSentDisable());
  };

  return (
    <>
      {isEmailSent ? (
        <ForgotPasswordFormSent
          email={email}
          onBack={onBack}
        />
      ) : (
        <ForgotPasswordForm
          register={register}
          errors={errors}
          formError={formError}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};
