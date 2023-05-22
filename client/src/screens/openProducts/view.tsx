import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  ShowProducts,
} from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

import style from './style.module.scss';

const PureOpenProducts: React.FC<Props> = (props) => {
  const {
    getProducts,
    getBreadcrumbsPaths,
  } = props;

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths} />}
    >
      <div className={style.screen}>
        <ShowProducts />
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

export const OpenProducts = connector(PureOpenProducts);
