import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  ShowProducts,
} from '../../components';
import { AppDispatch } from '../../model/store/store';
import { controller } from './controller';

import style from './style.module.scss';
import { useParams } from 'react-router-dom';

const PureSearchProducts: React.FC<Props> = (props) => {
  const { data } = useParams();

  const {
    getProducts,
    getBreadcrumbsPaths,
  } = props;

  React.useEffect(() => {
    getProducts();
  }, [data, getProducts]);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths()}/>}
    >
      <div className={style.screen}>
        <ShowProducts />
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths,
    getProducts: ctrl.getProducts,
  };
};

const connector = connect(() => ({}), mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const SearchProducts = connector(PureSearchProducts);
