import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { navigationApi, productsApi } from '../../model/apis';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  Loader,
  ShowAllCategories,
} from '../../components';

import style from './style.module.scss';

export const Products: React.FC = () => {
  const {
    categories,
    loading,
  } = useAppSelector((state) => state.productsApi);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(productsApi.getCategories());
  }, [dispatch]);

  const breadcrumbsPaths = () => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: '', name: {title: 'products'}},
    ];
  };

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={breadcrumbsPaths()}/>}
    >
      <div className={style.screen}>
        {loading ?
          <Loader />
          :
          <ShowAllCategories
            categories={categories}
            toProducts={navigationApi.toProducts}
          />
        }
      </div>
    </Layout>
  );
};
