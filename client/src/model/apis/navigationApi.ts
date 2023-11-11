import { generatePath, matchPath } from 'react-router-dom';

const navigation = () => {
  const routes = {
    home: '/',
    account: '/account',
    accountLogin: '/account/login',
    accountRegister: '/account/register',
    accountForgotPassword: '/account/reset/password',
    accountResetPassword: '/account/reset/password/:token',
    accountCart: '/account/cart',
    accountInfo: '/account/info',
    accountOrders: '/account/orders',
    products: '/products',
    openProductsCategory: '/products/:category',
    openProducts: '/products/:category/:brand/page/:page',
    openProduct: '/products/:category/:brand/:productId',
    searchProducts: '/products/search/:data',
    selected: '/products/selected',
    checkout: '/checkout',
    confirmation: '/checkout/confirmation',
  };

  const getPathName = () => window.location.pathname || routes.home;

  const setRoute = (route: string, params = {}) => {
    return generatePath(route, params);
  };

  return {
    routes,
    toHome: () => {
      return setRoute(routes.home);
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
    toProductsCategories: () => {
      return setRoute(routes.products);
    },
    toSearchProducts: (searchData: string) => {
      return setRoute(routes.searchProducts, {
        data: searchData,
      });
    },
    toProductsCategory: (category: string) => {
      return setRoute(routes.openProductsCategory, {
        category,
      });
    },
    toProducts: (category: string, brand: string, page: string) => {
      return setRoute(routes.openProducts, {
        category,
        brand,
        page,
      });
    },
    toProduct: (category: string, brand: string, productId: string) => {
      return setRoute(routes.openProduct, {
        category,
        brand,
        productId,
      });
    },
    toCheckout: () => {
      return setRoute(routes.checkout);
    },
    toCheckoutConfirm: () => {
      return setRoute(routes.confirmation);
    },
    getPathParams: (route: string) => {
      const match = matchPath(route, getPathName());
      return match?.params ?? {};
    },
  };
};

export const navigationApi = navigation();
