import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

import style from './style.module.scss';

const PureOpenProducts: React.FC<Props> = (props) => {
  const {
    getProducts,
    getPopularProducts,
    getBreadcrumbsPaths,
    products,
    loading,
    user,
    userDataLoaded,
  } = props;

  React.useEffect(() => {
    getProducts();
    getPopularProducts();
  }, [getProducts, getPopularProducts]);

  const { t } = useTranslation(['products']);

  const isProducts = Boolean(products.length);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths} />}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {userDataLoaded && !loading && (isProducts ?
          <ShowProducts
            products={products}
            user={user}
          />
          :
          <NoData text={t('noProducts')} />
        )}
        <ShowPopularProducts />
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  products: state.productsApi.products,
  loading: state.productsApi.loading,
  user: state.userApi.user,
  userDataLoaded: state.userApi.userDataLoaded,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getProducts: ctrl.getProducts,
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
    getPopularProducts: ctrl.getPopularProducts,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const OpenProducts = connector(PureOpenProducts);
