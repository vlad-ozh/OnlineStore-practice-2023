import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  ShowProducts,
  Loader,
  NoData,
} from '../../components';

import style from './style.module.scss';
import { navigationApi, productsApi } from '../../model/apis';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useTranslation } from 'react-i18next';

export const Selected: React.FC = () => {
  const {
    user,
    userDataLoaded,
  } = useAppSelector((state) => state.userApi);
  const {
    products,
    loading,
  } = useAppSelector((state) => state.productsApi);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { t } = useTranslation(['products']);

  React.useEffect(() => {
    if (userDataLoaded && !user.isAuth)
      navigate(navigationApi.toAccountLogin(), { replace: true });

    userDataLoaded && dispatch(productsApi.getSelectedProducts(user.id));
  }, [user, userDataLoaded, dispatch, navigate]);

  const breadcrumbsPaths = () => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: navigationApi.toAccount(), name: {title: 'profile'}},
      {path: '', name: {title: 'selected'}},
    ];
  };

  const isProducts = Boolean(products.length);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={breadcrumbsPaths()}/>}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {userDataLoaded && user.isAuth && !loading &&
          (isProducts ?
            <ShowProducts
              products={products}
              user={user}
            />
            :
            <NoData text={t('noProducts')} />
          )
        }
      </div>
    </Layout>
  );
};
