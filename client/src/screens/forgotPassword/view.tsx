import React from 'react';
import { Navigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { navigationApi, userApi } from '../../model/apis';
import { IUserForgotPassword } from '../../model/types/IUser';
import { userActions } from '../../model/store/reducers/UserSlice';
import {
  Header,
  Layout,
  Footer,
  Loader,
  Breadcrumbs,
  ForgotPasswordContent,
} from '../../components';

import style from './style.module.scss';

export const ForgotPassword: React.FC = () => {
  const {
    user,
    error,
    loading,
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

  const onSubmit: SubmitHandler<IUserForgotPassword> = data => {
    const user = {
      email: data.email.trim(),
    };

    dispatch(userApi.forgotPassword(user));
  };

  const getBreadcrumbsPaths = () => {
    const breadcrumbsPaths = [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: '', name: {title: 'forgotPassword'}},
    ];

    return breadcrumbsPaths;
  };

  const onBack = () => {
    dispatch(userActions.emailSentDisable());
  };

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths()}/>}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {user.isAuth ? (
          <Navigate to={navigationApi.toAccount()} replace={true} />
        ) : (
          <>
            {!loading && (
              <ForgotPasswordContent
                email={getValues('email')}
                onBack={onBack}
                register={register}
                errors={errors}
                formError={error}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                isEmailSent={isEmailSent}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
