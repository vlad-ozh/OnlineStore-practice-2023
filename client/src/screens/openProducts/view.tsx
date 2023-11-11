import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import Pagination from 'rc-pagination';

import style from './style.module.scss';
import 'rc-pagination/assets/index.css';

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

  const {
    category: categoryParam,
    brand: brandParam,
    page: pageParam,
  } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(productsApi.getProductsByBrand({
      category: `${categoryParam}`, brand: `${brandParam}`,
    }));
    dispatch(productsApi.getPopularByCategory({
      category: `${categoryParam}`, brand: `${brandParam}`,
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

  const productsOnOnePage = React.useMemo(() => {
    if (!pageParam || +pageParam < 0) return;

    const pageSize = 10;
    const skip = (+pageParam - 1) * pageSize;
    const prods = products.slice(skip, skip + 10);

    console.log('🚀 ~ productsOnOnePage');
    return prods;
  }, [pageParam, products]);

  const handlePageChange = (page: number) => {
    if (categoryParam && brandParam)
      navigate(
        navigationApi.toProducts(categoryParam, brandParam, `${page}`),
        { replace: true }
      );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isProducts = Boolean(productsOnOnePage?.length);

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
              products={productsOnOnePage}
              user={user}
            />
            <div className={style.pagination}>
              <Pagination
                simple
                total={products.length}
                onChange={handlePageChange}
                current={pageParam ? +pageParam : 1}
              />
            </div>
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
