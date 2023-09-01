import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    userDataLoaded,
  } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const tokenParam = useParams().token;

  const navigate = useNavigate();

  useEffect(() => {
    if (userDataLoaded && user.isAuth)
      return navigate(navigationApi.toAccount(), { replace: true });

    if (userDataLoaded && !isToken)
      return navigate(navigationApi.toAccountLogin(), { replace: true });

    if (typeof tokenParam === 'string') {
      dispatch(userApi.checkToken(tokenParam));
    }
  }, [tokenParam, dispatch, navigate, isToken, user, userDataLoaded]);

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

  const breadcrumbsPaths = () => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: '', name: {title: 'resetPassword'}},
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
        {userDataLoaded && !user.isAuth && isToken && !loading &&
          <ResetPasswordForm
            register={register}
            errors={errors}
            formError={error}
            handleSubmit={handleSubmit}
            onSubmit={onSubmitWithParams({isToken, token: tokenParam})}
            passwordValue={passwordValue}
          />
        }
      </div>
    </Layout>
  );
};
