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
} from '../../components';
import { controller } from './controller';

import style from './style.module.scss';

const PureAccountRegister: React.FC<Props> = (props) => {
  const { user, error, loading, onLogin, onCreate, getAccountLink } = props;

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const { t } = useTranslation(['authorization']);

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
            {t('registerTitle')}
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
            <label className={style.formLabel} htmlFor={'name'}>
              {t('name')}
            </label>
            <Input
              value={formData.name}
              type='text'
              name='name'
              onBlur={(value) => setFormData({ ...formData, name: value })}
              placeholder={t('namePlaceholder')}
              required
              className={style.formInput}
            />
          </fieldset>
          <fieldset className={style.formFieldset}>
            <label className={style.formLabel} htmlFor={'password'}>
              {t('password')}
              {t('totalCharacters')}
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
            onClick={() => onCreate(formData)}
            className={style.formButton}
          >
            {t('create')}
          </Button>

          <p className={style.formParagraph}>
            {t('haveAcc')}
            <Link
              to={onLogin}
              className={style.formLink}
            >
              {t('login')}
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
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {user.isAuth && <Navigate to={getAccountLink} replace={true} />}
        {!user.isAuth && !loading && renderRegisterForm()}
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
    getAccountLink: ctrl.getAccountLink(),
    onLogin: ctrl.getLoginLink(),
    onCreate: ctrl.onCreate,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const AccountRegister = connector(PureAccountRegister);
