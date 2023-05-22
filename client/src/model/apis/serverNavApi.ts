import { generatePath } from 'react-router-dom';

const serverNavigation = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const userRoutes = {
    getAllUsers: '/user/allUsers',
    register: '/user/register',
    login: '/user/login',
    logout: '/user/logout',
    refresh: `${serverUrl}/user/refresh`,
    forgotPassword: '/user/forgot/password',
    checkToken: '/user/check/token/:token',
    resetPassword: '/user/reset/password/:token',
    addProductToSelected: '/user/add/product-to-selected',
  };

  const productsRoutes = {
    getCategoryInfo: '/products/:category/info',
    getProductsByBrand: '/products/:category/:brand',
    getSearchProducts: '/products/:search',
    getSelectedProducts: '/products/selected/user/:userId',
  };

  const setRoute = (route: string, params = {}) => {
    return generatePath(route, params);
  };

  return {
    userRoutes,
    productsRoutes,
    toCheckToken: (token: string) => {
      return setRoute(userRoutes.checkToken, {
        token,
      });
    },
    toResetPassword: (token: string) => {
      return setRoute(userRoutes.resetPassword, {
        token,
      });
    },
    toGetCategory: (category: string) => {
      return setRoute(productsRoutes.getCategoryInfo, {
        category,
      });
    },
    toGetProductsByBrand: (category: string, brand: string) => {
      return setRoute(productsRoutes.getProductsByBrand, {
        category,
        brand,
      });
    },
    toGetSearchProducts: (search: string) => {
      return setRoute(productsRoutes.getSearchProducts, {
        search,
      });
    },
    toGetSelectedProducts: (userId: string) => {
      return setRoute(productsRoutes.getSelectedProducts, {
        userId,
      });
    },
  };
};

export const serverNavApi = serverNavigation();
