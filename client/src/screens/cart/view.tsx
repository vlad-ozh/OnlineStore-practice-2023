import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { navigationApi, productsApi, userApi } from '../../model/apis';
import { IUserCart } from '../../model/types/IUser';
import { IProduct } from '../../model/types/IProducts';
import {
  Header,
  Layout,
  Footer,
  Breadcrumbs,
  Loader,
  CartContent,
  NoData,
} from '../../components';

import style from './style.module.scss';

export const Cart: React.FC = () => {
  const {
    user,
    userDataLoaded,
  } = useAppSelector((state) => state.userApi);
  const {
    products,
    loading,
  } = useAppSelector((state) => state.productsApi);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { t } = useTranslation(['products']);

  const {
    toProduct,
    toCheckout,
    toAccountLogin,
    toAccount,
    toHome,
  } = navigationApi;

  React.useEffect(() => {
    if (userDataLoaded && !user.isAuth)
      navigate(toAccountLogin(), {replace: true});
    userDataLoaded && dispatch(productsApi.getProductsInCart(user.id));
  }, [dispatch, user, userDataLoaded, navigate, toAccountLogin]);


  const getBreadcrumbsPaths = () => {
    const breadcrumbsPaths = [
      {path: toHome(), name: {title: 'home'}},
      {path: toAccount(), name: {title: 'profile'}},
      {path: '', name: {title: 'cart'}},
    ];

    return breadcrumbsPaths;
  };

  const removeProduct = (userId: string, productId: string) => {
    dispatch(userApi.removeProductFromCart({ userId, productId }));
  };
  const amountProductInCart = (cart: IUserCart[], productId: string) => {
    const product = cart.find(product => product.id === productId);

    return product ? product.amount : 1;
  };
  const changeAmount = (
    userId: string,
    productId: string,
    amount: number,
    value: number
  ) => {
    dispatch(userApi.changeAmountProductBuy({
      userId,
      productId,
      amount,
      value,
    }));
  };
  const productPrice = (
    cart: IUserCart[],
    productId: string,
    productPrice: number
  ) => {
    const product = cart.find(product => product.id === productId);

    if (product === undefined) {
      return productPrice.toLocaleString();
    }

    return (productPrice * product.amount).toLocaleString();
  };
  const totalPrice = (cart: IUserCart[], products: IProduct[]) => {
    let totalPrice = 0;
    products.forEach(product => {
      const prod = cart.find(prod => prod.id === product.id);

      if (prod === undefined) {
        return totalPrice += product.price;
      }

      return totalPrice += product.price * prod.amount;
    });

    return totalPrice.toLocaleString();
  };

  const isProducts = Boolean(products.length);

  return (
    <Layout
      topBar={<Header />}
      bottomBar={<Footer />}
      breadcrumbs={<Breadcrumbs paths={getBreadcrumbsPaths()}/>}
    >
      <div className={style.screen}>
        {loading && <Loader />}
        {userDataLoaded && user.isAuth && !loading &&
          (isProducts ?
            <CartContent
              user={user}
              products={products}
              removeProduct={removeProduct}
              toCheckout={toCheckout()}
              changeAmount={changeAmount}
              amountProductInCart={amountProductInCart}
              productPrice={productPrice}
              toProduct={toProduct}
              totalPrice={totalPrice}
            />
            :
            <NoData text={t('emptyCart')} />
          )
        }
      </div>
    </Layout>
  );
};
