import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  Loader,
  NoData,
  ProductMain,
  ProductSpecs,
  ProductReviews,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { navigationApi, productsApi } from '../../model/apis';
import { useTranslation } from 'react-i18next';

import style from './style.module.scss';

export const OpenProduct: React.FC = () => {
  const {
    user,
    userDataLoaded,
  } = useAppSelector((state) => state.userApi);
  const {
    product,
    loading,
  } = useAppSelector((state) => state.productsApi);
  const dispatch = useAppDispatch();

  const { category, brand, productId } = useParams();

  const { t } = useTranslation(['products']);

  React.useEffect(() => {
    if (productId !== undefined)
      dispatch(productsApi.getProduct(productId));
  }, [dispatch, productId]);

  const breadcrumbsPaths = (
    category: string | undefined,
    brand: string | undefined,
    productName: string
  ) => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: navigationApi.toProductsCategories(), name: {title: 'products'}},
      {
        path: navigationApi.toProductsCategory(`${category}`),
        name: {title: `${category}`},
      },
      {
        path: navigationApi.toProducts(`${category}`,`${brand}`,'1'),
        name: {title: `${brand}`},
      },
      {path: '', name: {title: productName}},
    ];
  };

  const isProduct = Boolean(product.id);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={
        <Breadcrumbs paths={breadcrumbsPaths(category, brand, product.name)} />
      }
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {userDataLoaded && !loading && (isProduct ?
          <>
            <ProductMain
              product={product}
              user={user}
            />
            <ProductSpecs
              specs={product.characteristics}
            />
            <ProductReviews
              userId={user.id}
              isAuth={user.isAuth}
              productId={product.id}
              reviews={product.reviews}
            />
          </>
          :
          <NoData text={t('noProduct')} />
        )}
      </div>
    </Layout>
  );
};
