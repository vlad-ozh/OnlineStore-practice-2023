import { generatePath } from 'react-router-dom';

const serverNavigation = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const userRoutes = {
    register: '/user/register',
    login: '/user/login',
    logout: '/user/logout',
    refresh: `${serverUrl}/user/refresh`,
    forgotPassword: '/user/forgot/password',
    checkToken: '/user/check/token/:token',
    resetPassword: '/user/reset/password/:token',
    addProductToSelected: '/user/add/product-to-selected',
    removeProductFromSelected: '/user/remove/product-from-selected',
    addProductToCart: '/user/add/product-to-cart',
    removeProductFromCart: '/user/remove/product-from-cart',
    changeAmountProductBuy: '/user/change/amount-product-buy',
  };

  const productsRoutes = {
    getCategoryInfo: '/products/categories/:category/info',
    getCategories: '/products/categories/info',
    getProductsByBrand: '/products/categories/:category/:brand',
    getSearchProducts: '/products/:search',
    getSelectedProducts: '/products/selected/user/:userId',
    getProductsInCart: '/products/cart/user/:userId',
    getProduct: '/products/product/:productId',
    createReview: '/products/create-review',
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
    toGetProductsInCart: (userId: string) => {
      return setRoute(productsRoutes.getProductsInCart, {
        userId,
      });
    },
    toGetProduct: (productId: string) => {
      return setRoute(productsRoutes.getProduct, {
        productId,
      });
    },
  };
};

export const serverNavApi = serverNavigation();
