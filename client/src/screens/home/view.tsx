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
  const { user } = useAppSelector((state) => state.userApi);
  const {
    categoriesNames: categories,
    popularProducts,
    loading,
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

        {!loading &&
          <ShowPopularProducts
            popularProducts={popularProducts}
            user={user}
          />
        }
      </div>
    </Layout>
  );
};
