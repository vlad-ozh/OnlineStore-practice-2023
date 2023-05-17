import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  Loader,
} from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { useTranslation } from 'react-i18next';
import { controller } from './controller';

import style from './style.module.scss';

const PureOpenProduct: React.FC<Props> = (props) => {
  const { t } = useTranslation(['home']);

  const {
    products,
    getProducts,
    loading,
    getBreadcrumbsPaths,
  } = props;


  React.useEffect(() => {
    // getProducts();
  }, [getProducts]);

  const renderProducts = () => {
    return (
      <div className={style.product}>
        product
      </div>
    );
  };
  const renderNoData = () => {
    return (
      <h3 className={style.noProduct}>
        {t('noProduct')}
      </h3>
    );
  };

  const isProducts = Boolean(products.length);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths} />}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {!loading && renderProducts()}
        {/* {!loading && !isProducts && renderNoData()} */}
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  products: state.productsApi.products,
  loading: state.productsApi.loading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getProducts: ctrl.getProducts,
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const OpenProduct = connector(PureOpenProduct);
