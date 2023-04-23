import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../model/store/store';
import { Header, Layout, Footer, Breadcrumbs } from '../../components';
import { controller } from './controller';

import style from './style.module.scss';

const PureAccountInfo: React.FC<Props> = (props) => {
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
        Account Info
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

export const AccountInfo = connector(PureAccountInfo);
