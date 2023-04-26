import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../../model/store/store';
import { useTranslation } from 'react-i18next';
import {
  Header,
  Layout,
  Footer,
  Input,
  Button,
  Loader,
  Breadcrumbs,
} from '../../components';
import { controller } from './controller';

import style from './style.module.scss';

const PureAccountResetPassword: React.FC<Props> = (props) => {
  const {
    user,
    error,
    loading,
    isToken,
    getBreadcrumbsPaths,
    getLoginLink,
    checkToken,
    onReset,
    getAccountLink,
  } = props;

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const { t } = useTranslation(['authorization']);
  const { token } = useParams();

  useEffect(() => {
    if (typeof token === 'string') {
      checkToken(token);
    }
  }, [token, checkToken]);


  const renderError = () => {
    return (
      <h4 className={style.formError}>
        {t(`${error}`)}
      </h4>
    );
  };

  const renderRegisterForm = () => {
    return (
      <div className={style.screenContainer}>
        <form className={style.form}>
          <h2 className={style.formTitle}>
            {t('resetTitle')}
          </h2>
          <fieldset className={style.formFieldset}>
            <label className={style.formLabel} htmlFor={'password'}>
              {t('newPassword')}
              {t('totalCharacters')}
            </label>
            <Input
              value={formData.password}
              type='password'
              name='password'
              onBlur={(value) => setFormData({...formData, password: value})}
              placeholder={t('newPasswordPlaceholder')}
              required
              className={style.formInput}
            />
          </fieldset>
          <fieldset className={style.formFieldset}>
            <label className={style.formLabel} htmlFor={'confirmPassword'}>
              {t('confirmPassword')}
            </label>
            <Input
              value={formData.confirmPassword}
              type='password'
              name='confirmPassword'
              onBlur={(value) =>
                setFormData({ ...formData, confirmPassword: value })
              }
              placeholder={t('passwordPlaceholder')}
              required
              className={style.formInput}
            />
          </fieldset>

          {error && renderError()}

          <Button
            skin='text'
            size='medium'
            onClick={() => onReset({...formData, isToken, token})}
            className={style.formButton}
          >
            {t('reset')}
          </Button>
        </form>
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
        {loading && <Loader />}
        {user.isAuth && <Navigate to={getAccountLink} replace={true} />}
        {!isToken && <Navigate to={getLoginLink} replace={true} />}
        {!user.isAuth && !loading && renderRegisterForm()}
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  user: state.userReducer.user,
  error: state.userReducer.error,
  loading: state.userReducer.loading,
  isToken: state.userReducer.isToken,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
    getAccountLink: ctrl.getAccountLink(),
    getLoginLink: ctrl.getLoginLink(),
    checkToken: ctrl.checkToken,
    onReset: ctrl.onReset,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const AccountResetPassword = connector(PureAccountResetPassword);
