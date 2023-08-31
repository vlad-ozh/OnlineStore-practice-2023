import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    userDataLoaded,
  } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (userDataLoaded && user.isAuth)
      navigate(navigationApi.toAccount(), { replace: true });
  }, [user, userDataLoaded, navigate]);

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

  const breadcrumbsPaths = () => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: '', name: {title: 'forgotPassword'}},
    ];
  };

  const onBack = () => {
    dispatch(userActions.emailSentDisable());
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
        }
      </div>
    </Layout>
  );
};
