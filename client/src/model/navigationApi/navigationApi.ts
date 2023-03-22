import { generatePath } from 'react-router-dom';

export const navigationApi = () => {
  const routes = {
    home: '/',
    products: '/products',
    openTheProductCategory: '/products/:category',
    openProduct: '/products/:category/:productId',
    checkout: '/checkout',
    openCheckoutProduct: '/checkout/:productId',
    checkoutConfirmation: '/checkout/confirmation ',
  };

  const serverUrl = process.env.SERVER_URL;

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
  };
};
