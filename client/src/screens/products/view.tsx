import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Layout, Footer } from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

import style from './style.module.scss';

const PureProducts: React.FC<Props> = (props) => {

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
    >
      <div className={style.text}>
        Products
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Products = connector(PureProducts);
