import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { Header, Layout, Footer, Breadcrumbs, Loader } from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { useTranslation } from 'react-i18next';
import { controller } from './controller';

import style from './style.module.scss';

const PureOpenCategory: React.FC<Props> = (props) => {
  const { t } = useTranslation(['home']);

  const {
    category,
    error,
    data,
    loading,
    getBreadcrumbsPaths,
    getProductsLink,
  } = props;


  React.useEffect(() => {
    data();
  }, [data, error]);

  const renderCategory = () => {
    return (
      <div className={style.category}>
        <div className={style.categoryInfo}>
          <h2 className={style.categoryTitle}>
            {category && t(category.name)}
          </h2>
          <h3 className={style.categoryTitleBrands}>
            {t('brands')}
          </h3>
          <ul className={style.categoryBrands}>
            {category && category.brands.map((brand, index) => {
              return (
                <li key={index} className={style.categoryBrandsItem}>
                  <Link
                    to={getProductsLink(brand)}
                    className={style.categoryBrandsItemLink}
                  >
                    {brand}
                  </Link>
                </li>
              );
            })}
            <li className={style.categoryBrandsItem}>
              <Link
                to={getProductsLink('all')}
                className={style.categoryBrandsItemLink}
              >
                {t('all')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths} />}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {!loading && category && renderCategory()}
        {!loading && error && <Navigate to={'/'} replace={true} />}
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  category: state.productsApi.category,
  loading: state.productsApi.loading,
  error: state.productsApi.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    data: ctrl.getCategory,
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
    getProductsLink: ctrl.getProductsLink,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const OpenCategory = connector(PureOpenCategory);
