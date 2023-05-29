import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Layout, Footer, Breadcrumbs, Loader } from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { useTranslation } from 'react-i18next';
import { controller } from './controller';

import style from './style.module.scss';
import { Link } from 'react-router-dom';

const PureProducts: React.FC<Props> = (props) => {
  const { t } = useTranslation(['products']);
  const {
    categories,
    getCategories,
    loading,
    getBreadcrumbsPaths,
    getProductsLink,
  } = props;

  React.useEffect(() => {
    getCategories();
  }, [getCategories]);

  const renderCategories = () => {
    return (
      <ul className={style.categories}>
        {categories.map(category => {
          return (
            <li key={category.name} className={style.category}>
              <h2 className={style.categoryTitle}>
                {t(category.name)}
              </h2>
              <h3 className={style.categoryTitleBrands}>
                {t('brands')}
              </h3>
              <ul className={style.categoryBrands}>
                {category.brands.map((brand, index) => {
                  return (
                    <li key={index} className={style.categoryBrandsItem}>
                      <Link
                        to={getProductsLink(category.name, brand)}
                        className={style.categoryBrandsItemLink}
                      >
                        {brand}
                      </Link>
                    </li>
                  );
                })}
                <li className={style.categoryBrandsItem}>
                  <Link
                    to={getProductsLink(category.name, 'all')}
                    className={style.categoryBrandsItemLink}
                  >
                    {t('all')}
                  </Link>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths}/>}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {!loading && renderCategories()}
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  categories: state.productsApi.categories,
  loading: state.productsApi.loading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
    getCategories: ctrl.getCategories,
    getProductsLink: ctrl.getProductsLink,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Products = connector(PureProducts);
