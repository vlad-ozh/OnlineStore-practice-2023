import React from 'react';
import { navigationApi, productsApi } from '../../model/apis';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  ShowPopularProducts,
  ShowCategories,
} from '../../components';

import style from './style.module.scss';

export const Home: React.FC = () => {
  const {
    categoriesNames: categories,
  } = useAppSelector((state) => state.productsApi);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(productsApi.getPopularProducts());
  }, [dispatch]);


  const breadcrumbsPaths = () => {
    return [
      {path: '', name: {title: 'home'}},
    ];
  };

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={breadcrumbsPaths()}/>}
    >
      <div className={style.screen}>
        <ShowCategories
          categories={categories}
          toProductsCategory={navigationApi.toProductsCategory}
        />

        <ShowPopularProducts />
      </div>
    </Layout>
  );
};
