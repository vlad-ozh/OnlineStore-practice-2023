import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../../model/store/store';
import { useTranslation } from 'react-i18next';
import { Header, Layout, Footer, Button, Breadcrumbs } from '../../components';
import { controller } from './controller';
import {
  PersonIcon,
  ListIcon,
  LogoutIcon,
} from '../../assets/images/svg-images';

import style from './style.module.scss';
import classNames from 'classnames';

const PureAccount: React.FC<Props> = (props) => {
  const { t } = useTranslation(['account']);
  const {
    user,
    getBreadcrumbsPaths,
    onLogout,
    onAccountInfo,
    onAccountOrders,
    getLoginLink,
  } = props;

  const renderUserAccActions = () => {
    return (
      <div className={style.content}>
        <h2 className={style.contentTitle}>
          {t('hello', { name: user.name })}
        </h2>
        <p className={classNames(style.contentActivationMsg, {
          [style.contentNoActivationMsg]: user.isActivated,
        })}>
          {t('needActivateAcc')}
        </p>
        <div className={style.contentBox}>
          <ul className={style.contentList}>
            <li className={style.contentListItem}>
              <Link to={onAccountInfo} className={style.contentListItemLink}>
                <PersonIcon />
                {t('personalInfo')}
              </Link>
            </li>
            <li className={style.contentListItem}>
              <Link to={onAccountOrders} className={style.contentListItemLink}>
                <ListIcon />
                {t('myOrders')}
              </Link>
            </li>
            <li className={style.contentListItem}>
              <Button
                skin='text'
                size='medium'
                onClick={onLogout}
                className={style.contentListItemButton}
              >
                <LogoutIcon />
                {t('logout')}
              </Button>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths}/>}
    >
      <div className={style.screen}>
        {!user.isAuth && <Navigate to={getLoginLink} replace={true} />}
        {user.isAuth && renderUserAccActions()}
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
    onLogout: ctrl.onLogout,
    getLoginLink: ctrl.getAccountLoginLink(),
    onAccountInfo: ctrl.getAccountInfoLink(),
    onAccountOrders: ctrl.getAccountOrdersLink(),
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Account = connector(PureAccount);
