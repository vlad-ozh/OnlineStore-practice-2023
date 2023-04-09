import { generatePath } from 'react-router-dom';

const navigation = () => {
  const routes = {
    home: '/',
    products: '/products',
    openTheProductCategory: '/products/:category',
    openProduct: '/products/:category/:productId',
    checkout: '/checkout',
    openCheckoutProduct: '/checkout/:productId',
    checkoutConfirmation: '/checkout/confirmation',
    accountLogin: '/account/login',
    accountRegister: '/account/register',
  };

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const queryUsersRoutes = {
    getAllUsers: `${serverUrl}/users/allUsers`,
  };
  const queryProductsRoutes = {
    getAllProducts: `${serverUrl}/products/allProducts`,
  };

  const setRoute = (route: string, params = {}) => {
    return generatePath(route, params);
  };

  return {
    routes,
    queryUsersRoutes,
    queryProductsRoutes,
    toHome: () => {
      return setRoute(routes.home);
    },
    toProducts: () => {
      return setRoute(routes.products);
    },
    toAccountLogin: () => {
      return setRoute(routes.accountLogin);
    },
    toAccountRegister: () => {
      return setRoute(routes.accountRegister);
    },
  };
};

export const navigationApi = navigation();
