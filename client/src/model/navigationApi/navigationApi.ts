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

  const setRoute = (route: string, params = {}) => {
    return generatePath(route, params);
  };

  return {
    routes,
    toHome: () => {
      return setRoute(routes.home);
    },
  };
};
