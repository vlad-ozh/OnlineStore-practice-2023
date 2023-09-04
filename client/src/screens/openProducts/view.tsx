import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { navigationApi, productsApi } from '../../model/apis';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  ShowProducts,
  ShowPopularProducts,
  Loader,
  NoData,
} from '../../components';

import style from './style.module.scss';

export const OpenProducts: React.FC = () => {
  const {
    user,
    userDataLoaded,
  } = useAppSelector((state) => state.userApi);
  const {
    products,
    popularProducts,
    loading,
  } = useAppSelector((state) => state.productsApi);
  const dispatch = useAppDispatch();

  const { category: categoryParam } = useParams();
  const { brand: brandParam } = useParams();

  React.useEffect(() => {
    dispatch(productsApi.getProductsByBrand({
      category: `${categoryParam}`, brand: `${brandParam}`,
    }));
    dispatch(productsApi.getPopularByCategory({
      category: `${categoryParam}`,
      brand: `${brandParam}`,
    }));
  }, [dispatch, categoryParam, brandParam]);

  const { t } = useTranslation(['products']);

  const breadcrumbsPaths = (
    category: string | undefined,
    brand: string | undefined
  ) => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: navigationApi.toProductsCategories(), name: {title: 'products'}},
      {
        path: navigationApi.toProductsCategory(`${category}`),
        name: {title: `${category}`},
      },
      {path: '', name: {title: `${brand}`}},
    ];
  };

  const isProducts = Boolean(products.length);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={
        <Breadcrumbs paths={breadcrumbsPaths(categoryParam, brandParam)} />
      }
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {userDataLoaded && !loading && (isProducts ?
          <>
            <ShowProducts
              products={products}
              user={user}
            />
            <ShowPopularProducts
              popularProducts={popularProducts}
              user={user}
            />
          </>
          :
          <NoData text={t('noProducts')} />
        )}
      </div>
    </Layout>
  );
};
