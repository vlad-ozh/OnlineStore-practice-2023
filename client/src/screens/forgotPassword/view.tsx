import React from 'react';
import { Navigate } from 'react-router-dom';
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

const PureForgotPassword: React.FC<Props> = (props) => {
  const {
    user,
    error,
    loading,
    email,
    getBreadcrumbsPaths,
    onChangeEmail,
    onBack,
    isEmailSent,
    onReset,
    getAccountLink,
  } = props;

  const { t } = useTranslation(['authorization']);

  const renderError = () => {
    return (
      <h4 className={style.formError}>
        {t(`${error}`)}
      </h4>
    );
  };

  const renderResetInfo = () => {
    return (
      <div className={style.screenContainer}>
        <div className={style.form}>
          <h2 className={style.formTitle}>
            {t('resetTitle')}
          </h2>
          <h3 className={style.formEmail}>
            {email}
          </h3>
          <p className={style.formParagraph}>
            {t('resetMsgSent')}
          </p>
          <Button
            skin='text'
            size='medium'
            onClick={onBack}
            className={style.formButton}
          >
            {t('back')}
          </Button>
        </div>
      </div>
    );
  };

  const renderResetForm = () => {
    return (
      <div className={style.screenContainer}>
        <form className={style.form}>
          <h2 className={style.formTitle}>
            {t('resetTitle')}
          </h2>
          <fieldset className={style.formFieldset}>
            <label className={style.formLabel} htmlFor={'email'}>
              {t('email')}
            </label>
            <Input
              value={email}
              type='email'
              name='email'
              onBlur={(value) => onChangeEmail(value)}
              placeholder={t('emailPlaceholder')}
              required
              className={style.formInput}
            />
          </fieldset>

          {error && renderError()}

          <Button
            skin='text'
            size='medium'
            onClick={() => onReset(email)}
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
        {!user.isAuth && !loading && !isEmailSent && renderResetForm()}
        {!user.isAuth && !loading && isEmailSent && renderResetInfo()}
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  user: state.userApi.user,
  error: state.userApi.error,
  loading: state.userApi.loading,
  email: state.userApi.email,
  isEmailSent: state.userApi.isResetPasswordEmailSent,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
    getAccountLink: ctrl.getAccountLink(),
    onChangeEmail: ctrl.onChangeEmail,
    onBack: ctrl.onBack,
    onReset: ctrl.onReset,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const ForgotPassword = connector(PureForgotPassword);
