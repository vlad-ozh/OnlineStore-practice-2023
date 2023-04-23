import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Header, Layout, Footer, Breadcrumbs } from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

import style from './style.module.scss';

const PureSelected: React.FC<Props> = (props) => {
  const {
    user,
    getBreadcrumbsPaths,
    getLoginLink,
  } = props;

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths}/>}
    >
      <div className={style.screen}>
        {!user.isAuth && <Navigate to={getLoginLink} replace={true} />}
        Selected products
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
    getLoginLink: ctrl.getAccountLoginLink(),
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Selected = connector(PureSelected);