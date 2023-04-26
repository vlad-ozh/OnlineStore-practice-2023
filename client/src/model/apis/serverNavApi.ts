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
  };

  const productsRoutes = {
    getAllProducts: '/products/allProducts',
  };

  const setRoute = (route: string, params = {}) => {
    return generatePath(route, params);
  };

  return {
    userRoutes,
    productsRoutes,
    toCheckToken: (token: string) => {
      return setRoute(userRoutes.checkToken, {
        token: token,
      });
    },
    toResetPassword: (token: string | undefined) => {
      return setRoute(userRoutes.resetPassword, {
        token: token,
      });
    },
  };
};

export const serverNavApi = serverNavigation();
