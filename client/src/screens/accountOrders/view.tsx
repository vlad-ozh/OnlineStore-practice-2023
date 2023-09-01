import React from 'react';
import { Header, Layout, Footer, Breadcrumbs, Loader } from '../../components';
import { useNavigate } from 'react-router-dom';
import { navigationApi } from '../../model/apis';
import { useAppDispatch, useAppSelector } from '../../hooks';

import style from './style.module.scss';

export const AccountOrders: React.FC = () => {
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
      {path: navigationApi.toAccount(), name: {title: 'profile'}},
      {path: '', name: {title: 'orders'}},
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
        {userDataLoaded && user.isAuth && !loading &&
          <>Account Orders</>
        }
      </div>
    </Layout>
  );
};
