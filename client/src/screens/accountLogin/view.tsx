import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
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

const PureAccountLogin: React.FC<Props> = (props) => {
  const {
    user,
    error,
    loading,
    getBreadcrumbsPaths,
    onRegister,
    onForgotPassword,
    onLogin,
    getAccountLink,
  } = props;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { t } = useTranslation(['authorization']);

  const renderError = () => {
    return (
      <h4 className={style.formError}>
        {t(`${error}`)}
      </h4>
    );
  };

  const renderLoginForm = () => {
    return (
      <div className={style.screenContainer}>
        <form className={style.form}>
          <h2 className={style.formTitle}>
            {t('loginTitle')}
          </h2>
          <fieldset className={style.formFieldset}>
            <label className={style.formLabel} htmlFor={'email'}>
              {t('email')}
            </label>
            <Input
              value={formData.email}
              type='email'
              name='email'
              onBlur={(value) => setFormData({ ...formData, email: value })}
              placeholder={t('emailPlaceholder')}
              required
              className={style.formInput}
            />
          </fieldset>
          <fieldset className={style.formFieldset}>
            <label className={style.formLabel} htmlFor={'password'}>
              {t('password')}
            </label>
            <Input
              value={formData.password}
              type='password'
              name='password'
              onBlur={(value) => setFormData({...formData, password: value})}
              placeholder={t('passwordPlaceholder')}
              required
              className={style.formInput}
            />
          </fieldset>

          {error && renderError()}

          <Button
            skin='text'
            size='medium'
            onClick={() => onLogin(formData)}
            className={style.formButton}
          >
            {t('next')}
          </Button>

          <p className={style.formParagraph}>
            {t('dontHaveAcc')}
            <Link
              to={onRegister}
              className={style.formLink}
            >
              {t('register')}
            </Link>
          </p>
          <p className={style.formParagraph}>
            <Link
              to={onForgotPassword}
              className={style.formLink}
            >
              {t('forgotPassword')}
            </Link>
          </p>
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
        {!user.isAuth && !loading && renderLoginForm()}
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  user: state.userReducer.user,
  error: state.userReducer.error,
  loading: state.userReducer.loading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
    getAccountLink: ctrl.getAccountLink(),
    onRegister: ctrl.getRegisterLink(),
    onForgotPassword: ctrl.getForgotPasswordLink(),
    onLogin: ctrl.onLogin,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const AccountLogin = connector(PureAccountLogin);
