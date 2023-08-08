import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { navigationApi, userApi } from '../../model/apis';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  IUserResetPasswordData,
  IUserResetPasswordToken,
} from '../../model/types/IUser';
import {
  Header,
  Layout,
  Footer,
  Loader,
  Breadcrumbs,
  ResetPasswordForm,
} from '../../components';

import style from './style.module.scss';

export const AccountResetPassword: React.FC = () => {
  const {
    user,
    error,
    loading,
    isToken,
  } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const tokenParam = useParams().token;

  useEffect(() => {
    if (typeof tokenParam === 'string') {
      dispatch(userApi.checkToken(tokenParam));
    }
  }, [tokenParam, dispatch]);

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

  const onSubmitWithParams = (additionalParams: IUserResetPasswordToken):
    SubmitHandler<IUserResetPasswordData> => {
    return (data) => {
      const {isToken, token} = additionalParams;

      if (typeof token === 'string') {
        const user = {
          password: data.password.trim(),
          isToken,
          token,
        };

        dispatch(userApi.resetPassword(user));
        reset();
      }
    };
  };

  const getBreadcrumbsPaths = () => {
    const breadcrumbsPaths = [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: '', name: {title: 'resetPassword'}},
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
        {user.isAuth ?(
          <Navigate to={navigationApi.toAccount()} replace={true} />
        ) : !isToken ? (
          <Navigate to={navigationApi.toAccountLogin()} replace={true} />
        ) : (
          <>
            {!loading && (
              <ResetPasswordForm
                register={register}
                errors={errors}
                formError={error}
                handleSubmit={handleSubmit}
                onSubmit={onSubmitWithParams({isToken, token: tokenParam})}
                passwordValue={passwordValue}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
