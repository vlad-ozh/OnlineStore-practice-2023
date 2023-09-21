import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserRegisterConfirm } from '../../model/types/IUser';
import { navigationApi, userApi } from '../../model/apis';
import { userActions } from '../../model/store/reducers/UserSlice';
import {
  Header,
  Layout,
  Footer,
  Loader,
  Breadcrumbs,
  RegisterForm,
} from '../../components';

import style from './style.module.scss';

export const AccountRegister: React.FC = () => {
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
    watch,
    reset,
    formState: { errors },
  } = useForm<IUserRegisterConfirm>({
    mode: 'onChange',
  });
  const passwordValue = watch('password');

  const onSubmit: SubmitHandler<IUserRegisterConfirm> = data => {
    const user = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
    };

    dispatch(userApi.register(user));
    reset();
  };

  const breadcrumbsPaths = () => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: '', name: {title: 'register'}},
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
          <RegisterForm
            register={register}
            errors={errors}
            formError={error}
            loginLink={navigationApi.toAccountLogin()}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            passwordValue={passwordValue}
          />
        }
      </div>
    </Layout>
  );
};
