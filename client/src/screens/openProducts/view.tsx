import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { Header, Layout, Footer, Breadcrumbs, Loader } from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { useTranslation } from 'react-i18next';
import { controller } from './controller';

import style from './style.module.scss';

const PureOpenProducts: React.FC<Props> = (props) => {
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
    // data();
  }, [data, error]);

  const renderCategory = () => {
    return (
      <div className={style.category}>
        products
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
        {!loading && renderCategory()}
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

export const OpenProducts = connector(PureOpenProducts);
