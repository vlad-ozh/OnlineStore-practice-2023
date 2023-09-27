import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { navigationApi, userApi } from '../../model/apis';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userActions } from '../../model/store/reducers/UserSlice';
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

    return () => {
      dispatch(userActions.clearError());
    };
  }, [tokenParam, dispatch, navigate, isToken, user, userDataLoaded]);

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
          <ResetPasswordForm tokenParam={tokenParam}/>
        }
      </div>
    </Layout>
  );
};
