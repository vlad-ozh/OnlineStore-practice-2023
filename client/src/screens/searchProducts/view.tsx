import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
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

export const SearchProducts: React.FC = () => {
  const {
    user,
  } = useAppSelector((state) => state.userApi);
  const {
    products,
    loading,
  } = useAppSelector((state) => state.productsApi);
  const dispatch = useAppDispatch();

  const { data } = useParams();

  const { t } = useTranslation(['products']);

  React.useEffect(() => {
    if (data !== undefined)
      dispatch(productsApi.getSearchProducts(data));
  }, [data, dispatch]);

  const breadcrumbsPaths = (data: string | undefined) => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: navigationApi.toProductsCategories(), name: {title: 'products'}},
      {path: '', name: {title: 'search', settings: { search: data }}},
    ];
  };

  const isProducts = Boolean(products.length);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={breadcrumbsPaths(data)}/>}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {!loading && (isProducts ?
          <ShowProducts
            products={products}
            user={user}
          />
          :
          <NoData text={t('noProducts')} />
        )}
      </div>
    </Layout>
  );
};
