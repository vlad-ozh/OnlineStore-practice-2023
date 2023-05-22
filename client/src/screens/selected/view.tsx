import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';
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
const PureSelected: React.FC<Props> = (props) => {
  const {
    user,
    getBreadcrumbsPaths,
    getLoginLink,
    getProducts,
  } = props;

  React.useEffect(() => {
    getProducts(user.id);
  }, [getProducts, user]);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths}/>}
    >
      <div className={style.screen}>
        {!user.isAuth && <Navigate to={getLoginLink} replace={true} />}
        <ShowProducts />
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  user: state.userApi.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
    getLoginLink: ctrl.getAccountLoginLink(),
    getProducts: ctrl.getProducts,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Selected = connector(PureSelected);
