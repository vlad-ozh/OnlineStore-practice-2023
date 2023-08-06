import React from 'react';
import { Navigate } from 'react-router-dom';
import { navigationApi, userApi } from '../../model/apis';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserLogin } from '../../model/types/IUser';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  Header,
  Layout,
  Footer,
  Loader,
  Breadcrumbs,
  LoginForm,
} from '../../components';

import style from './style.module.scss';

export const AccountLogin: React.FC = () => {
  const {
    user,
    error,
    loading,
  } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

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

  const getBreadcrumbsPaths = () => {
    const breadcrumbsPaths = [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: '', name: {title: 'login'}},
    ];

    return breadcrumbsPaths;
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
              <LoginForm
                register={register}
                errors={errors}
                formError={error}
                registerLink={navigationApi.toAccountRegister()}
                forgotPasswordLink={navigationApi.toAccountForgotPassword()}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
