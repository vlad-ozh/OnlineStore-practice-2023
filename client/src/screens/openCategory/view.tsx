import React from 'react';
import { useParams } from 'react-router-dom';
import { navigationApi, productsApi } from '../../model/apis';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useTranslation } from 'react-i18next';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  Loader,
  ShowCategory,
  NoData,
} from '../../components';

import style from './style.module.scss';

export const OpenCategory: React.FC = () => {
  const {
    category,
    loading,
  } = useAppSelector((state) => state.productsApi);
  const dispatch = useAppDispatch();

  const { category: categoryParam } = useParams();

  const { t } = useTranslation(['products']);

  React.useEffect(() => {
    if(categoryParam !== undefined)
      dispatch(productsApi.getCategoryInfo(categoryParam));
  }, [dispatch, categoryParam]);

  const breadcrumbsPaths = (categoryName: string | undefined) => {
    return [
      {path: navigationApi.toHome(), name: {title: 'home'}},
      {path: navigationApi.toProductsCategories(), name: {title: 'products'}},
      {path: '', name: {title: `${categoryName}`}},
    ];
  };
  const toProducts = (category: string | undefined, brand: string) => {
    const validCategory = category !== undefined ? category : '';

    return navigationApi.toProducts(validCategory, brand, '1');
  };

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={breadcrumbsPaths(categoryParam)} />}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {!loading && (category ?
          <ShowCategory
            category={category}
            categoryParam={categoryParam}
            toProducts={toProducts}
          /> :
          <NoData text={t('noCategory')} />
        )}
      </div>
    </Layout>
  );
};
