import React from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationApi, userApi } from '../../model/apis';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userActions } from '../../model/store/reducers/UserSlice';
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
    userDataLoaded,
  } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (userDataLoaded && user.isAuth)
      navigate(navigationApi.toAccount(), { replace: true });

    return () => {
      dispatch(userActions.clearError());
    };
  }, [user, userDataLoaded, navigate, dispatch]);

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

  const breadcrumbsPaths = () => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: '', name: {title: 'login'}},
    ];
  };

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={breadcrumbsPaths()}/>}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {userDataLoaded && !user.isAuth && !loading &&
          <LoginForm
            register={register}
            errors={errors}
            formError={error}
            registerLink={navigationApi.toAccountRegister()}
            forgotPasswordLink={navigationApi.toAccountForgotPassword()}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        }
      </div>
    </Layout>
  );
};
