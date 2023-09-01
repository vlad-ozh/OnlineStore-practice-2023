import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { navigationApi, userApi } from '../../model/apis';
import { useNavigate } from 'react-router-dom';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  AccountContent,
  Loader,
} from '../../components';

import style from './style.module.scss';

export const Account: React.FC = () => {
  const {
    user,
    userDataLoaded,
    loading,
  } = useAppSelector((state) => state.userApi);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (userDataLoaded && !user.isAuth)
      navigate(navigationApi.toAccountLogin(), { replace: true });
  }, [user, userDataLoaded, dispatch, navigate]);


  const breadcrumbsPaths = () => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: '', name: {title: 'profile'}},
    ];
  };

  const toAccountInfo = () => {
    return navigationApi.toAccountInfo();
  };
  const toAccountOrders = () => {
    return navigationApi.toAccountOrders();
  };
  const onLogout = () => {
    dispatch(userApi.logout());
  };

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={breadcrumbsPaths()}/>}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {userDataLoaded && user.isAuth && !loading &&
          <AccountContent
            user={user}
            toAccountInfo={toAccountInfo()}
            toAccountOrders={toAccountOrders()}
            onLogout={onLogout}
          />
        }
      </div>
    </Layout>
  );
};
