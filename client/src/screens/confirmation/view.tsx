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
  Button,
} from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

import style from './style.module.scss';

const PureConfirmation: React.FC<Props> = (props) => {
  const { t } = useTranslation(['products']);
  const {
    user,
    products,
    loading,
    getProducts,
    getBreadcrumbsPaths,
    getLoginLink,
    getProductPrice,
    totalPrice,
    productLink,
  } = props;

  React.useEffect(() => {
    getProducts(user.id);
  }, [getProducts, user]);

  const renderProducts = () => {
    return (
      <div className={style.products}>
        <ul className={style.productsList}>
          {products.map((product) => {
            const {
              id,
              brand,
              category,
              image,
              name,
              price,
            } = product;

            return (
              <li key={id} className={style.product}>
                <Link
                  to={productLink(category, brand, id)}
                  className={style.productLink}
                >
                  <div className={style.productImageContainer}>
                    <img
                      className={style.productImage}
                      src={image[0]}
                      alt={name}
                    />
                  </div>
                </Link>
                <div className={style.productInfo}>
                  <h4 className={style.productTitle}>
                    <Link
                      to={productLink(category, brand, id)}
                      className={style.productLink}
                    >
                      {name}
                    </Link>
                  </h4>
                  <div className={style.productPrice}>
                    <p>amount: 1</p>
                    <h4>
                      {getProductPrice(user.cart, id, price)} ₴
                    </h4>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={style.productsOrder}>
          <div className={style.productsTotalPrice}>
            <h3 className={style.productsText}>
              {t('totalPrice')}
            </h3>
            <h3 className={style.productsPrice}>
              {totalPrice(user.cart, products)} ₴
            </h3>
          </div>
          <Link to={''}>
            <Button
              skin='text'
              size='medium'
              onClick={
                () => window.alert('You will be able to preview very soon :)')
              }
              className={style.productsOrderLink}
            >
              {t('order')}
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  const isProducts = Boolean(products.length);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths}/>}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {!loading && isProducts && renderProducts()}
        {!user.isAuth && <Navigate to={getLoginLink} replace={true} />}
      </div>
    </Layout>
  );
};

const mapState = (state: RootState) => ({
  user: state.userApi.user,
  loading: state.productsApi.loading,
  products: state.productsApi.products,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  const ctrl = controller(dispatch);

  return {
    getProducts: ctrl.getProducts,
    getBreadcrumbsPaths: ctrl.getBreadcrumbsPaths(),
    getLoginLink: ctrl.getAccountLoginLink(),
    removeProduct: ctrl.removeProduct,
    getAmountProduct: ctrl.getAmountProduct,
    changeAmount: ctrl.changeAmount,
    getProductPrice: ctrl.getProductPrice,
    totalPrice: ctrl.getTotalPrice,
    productLink: ctrl.getProductLink,
  };
};

const connector = connect(mapState, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const Confirmation = connector(PureConfirmation);
