import React from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationApi } from '../../model/apis';
import { userActions } from '../../model/store/reducers/UserSlice';
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
          <LoginForm />
        }
      </div>
    </Layout>
  );
};
