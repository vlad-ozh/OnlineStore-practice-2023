import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RemoveIcon } from '../../assets/images/svg-images';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  Loader,
  Button,
  InputCounter,
} from '../../components';
import { AppDispatch, RootState } from '../../model/store/store';
import { controller } from './controller';

import style from './style.module.scss';

const PureCart: React.FC<Props> = (props) => {
  const { t } = useTranslation(['products']);
  const {
    user,
    products,
    loading,
    getProducts,
    getBreadcrumbsPaths,
    getLoginLink,
    removeProduct,
    getAmountProduct,
    changeAmount,
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
              amount,
            } = product;

            return (
              <li key={id} className={style.product}>
                <Button
                  size='large'
                  skin='icon'
                  onClick={() => removeProduct(user.id, id)}
                  className={style.productRemoveButton}
                >
                  <RemoveIcon />
                </Button>
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
                    <InputCounter
                      value={getAmountProduct(user.cart, id)}
                      onBlur={
                        (value) => changeAmount(user.id, id, amount, value)
                      }
                      maxValue={product.amount}
                    />
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

  const renderNoData = () => {
    return (
      <h3 className={style.noProducts}>
        {t('emptyCart')}
      </h3>
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
        {!loading && !isProducts && renderNoData()}
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

export const Cart = connector(PureCart);
