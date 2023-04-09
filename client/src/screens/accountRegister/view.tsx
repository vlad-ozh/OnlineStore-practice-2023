import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../../model/store/store';
import { useTranslation } from 'react-i18next';
import { Header, Layout, Footer, Input, Button } from '../../components';
import { controller } from './controller';

import style from './style.module.scss';

const PureAccountRegister: React.FC<Props> = (props) => {
  const { onLogin } = props;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { t } = useTranslation(['authorization']);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
    >
      <div className={style.box}>
        <form className={style.form}>
          <h2 className={style.formTitle}>
            {t('registerTitle')}
          </h2>
          <fieldset className={style.formFieldset}>
            <label className={style.formLabel} htmlFor={'email'}>
              {t('email')}
            </label>
            <Input
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
              type='password'
              name='password'
              onBlur={(value) => setFormData({ ...formData, password: value })}
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

          <Button
            skin='text'
            size='medium'
            onClick={() => console.log('first')}
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
    </Layout>
  );
};

const mapState = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    onLogin: ctrl.getLoginLink(),
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const AccountRegister = connector(PureAccountRegister);
