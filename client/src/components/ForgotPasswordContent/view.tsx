import React from 'react';
import { ForgotPasswordForm, ForgotPasswordFormSent } from '..';
import { IUserForgotPassword } from '../../model/types/IUser';
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

interface IProps {
  isEmailSent: boolean;
  register: UseFormRegister<IUserForgotPassword>;
  errors: FieldErrors<IUserForgotPassword>;
  formError: string | null;
  handleSubmit: UseFormHandleSubmit<IUserForgotPassword, undefined>;
  onSubmit: SubmitHandler<IUserForgotPassword>;
  email: string;
  onBack: () => void;
}

export const ForgotPasswordContent: React.FC<IProps> = ({
  email,
  isEmailSent,
  handleSubmit,
  onSubmit,
  onBack,
  register,
  errors,
  formError,
}) => {

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
