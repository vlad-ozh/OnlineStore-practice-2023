import { generatePath } from 'react-router-dom';

const navigation = () => {
  const routes = {
    home: '/',
    products: '/products',
    searchProducts: '/products/search/:data',
    selected: '/products/selected',
    openTheProductCategory: '/products/:category',
    openProduct: '/products/:category/:productId',
    checkout: '/checkout',
    openCheckoutProduct: '/checkout/:productId',
    checkoutConfirmation: '/checkout/confirmation',
    account: '/account',
    accountLogin: '/account/login',
    accountRegister: '/account/register',
    accountForgotPassword: '/account/reset/password',
    accountResetPassword: '/account/reset/password/:token',
    accountCart: '/account/cart',
    accountInfo: '/account/info',
    accountOrders: '/account/orders',
  };

  const setRoute = (route: string, params = {}) => {
    return generatePath(route, params);
  };

  return {
    routes,
    toHome: () => {
      return setRoute(routes.home);
    },
    toProducts: () => {
      return setRoute(routes.products);
    },
    toSearchProducts: (searchData: string) => {
      return setRoute(routes.searchProducts, {
        data: searchData,
      });
    },
    toSelectedProducts: () => {
      return setRoute(routes.selected);
    },
    toAccount: () => {
      return setRoute(routes.account);
    },
    toAccountLogin: () => {
      return setRoute(routes.accountLogin);
    },
    toAccountRegister: () => {
      return setRoute(routes.accountRegister);
    },
    toAccountForgotPassword: () => {
      return setRoute(routes.accountForgotPassword);
    },
    toAccountCart: () => {
      return setRoute(routes.accountCart);
    },
    toAccountInfo: () => {
      return setRoute(routes.accountInfo);
    },
    toAccountOrders: () => {
      return setRoute(routes.accountOrders);
    },
  };
};

export const navigationApi = navigation();
