import React from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationApi } from '../../model/apis';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userActions } from '../../model/store/reducers/UserSlice';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  Loader,
  AccountInfoContent,
} from '../../components';

import style from './style.module.scss';

export const AccountInfo: React.FC = () => {
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

    return () => {
      dispatch(userActions.clearError());
    };
  }, [user, userDataLoaded, navigate, dispatch]);

  const breadcrumbsPaths = () => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: navigationApi.toAccount(), name: {title: 'profile'}},
      {path: '', name: {title: 'profileInfo'}},
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
          <AccountInfoContent />
        }
      </div>
    </Layout>
  );
};
