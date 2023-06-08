import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  Loader,
  Input,
} from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

import style from './style.module.scss';

const PureCheckout: React.FC<Props> = (props) => {
  const { t } = useTranslation(['checkout']);
  const {
    user,
    error,
    loading,
    getBreadcrumbsPaths,
    getCartLink,
    onNext,
    validate,
  } = props;

  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    city: '',
    postNum: 0,
  });

  React.useEffect(() => {
    validate(formData);
  }, [validate, formData, user]);

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
            {t('checkoutTitle')}
          </h2>
          <h4 className={style.formDeliveryMsg}>
            {t('deliveryMsg')}
          </h4>
          <fieldset className={style.formFieldset}>
            <label className={style.formLabel} htmlFor={'name'}>
              {t('name')}
            </label>
            <Input
              value={formData.name}
              type='text'
              name='name'
              id='name'
              onBlur={(value) => setFormData({ ...formData, name: value })}
              placeholder={t('namePlaceholder')}
              required
              className={style.formInput}
            />
          </fieldset>
          <fieldset className={style.formFieldset}>
            <label className={style.formLabel} htmlFor={'phone'}>
              {t('phone')}
            </label>
            <Input
              value={formData.phone}
              type='tel'
              name='phone'
              id='phone'
              onBlur={(value) => setFormData({ ...formData, phone: value })}
              placeholder={t('phonePlaceholder')}
              required
              className={style.formInput}
            />
          </fieldset>
          <fieldset className={style.formFieldset}>
            <label className={style.formLabel} htmlFor={'city'}>
              {t('city')}
            </label>
            <Input
              value={formData.city}
              type='text'
              name='city'
              id='city'
              onBlur={(value) => setFormData({...formData, city: value})}
              placeholder={t('cityPlaceholder')}
              required
              className={style.formInput}
            />
          </fieldset>
          <fieldset className={style.formFieldset}>
            <label className={style.formLabel} htmlFor={'postNum'}>
              {t('postNum')}
            </label>
            <Input
              value={formData.postNum === 0 ? '' : formData.postNum.toString()}
              type='number'
              name='postNum'
              id='postNum'
              onBlur={(value) =>
                setFormData({ ...formData, postNum: +value })
              }
              placeholder={t('postNumPlaceholder')}
              required
              className={style.formInput}
            />
          </fieldset>

          {error && renderError()}

          <Link to={onNext(formData, error)} className={style.formLink}>
            {t('next')}
          </Link>

        </form>
      </div>
    );
  };

  const isProducts = Boolean(user.cart?.length);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths}/>}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {!loading && renderRegisterForm()}
        {!loading && !isProducts && <Navigate to={getCartLink} replace={true}/>}
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  user: state.userApi.user,
  error: state.userApi.error,
  loading: state.productsApi.loading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
    getCartLink: ctrl.getCartLink(),
    onNext: ctrl.onNext,
    validate: ctrl.validate,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Checkout = connector(PureCheckout);
