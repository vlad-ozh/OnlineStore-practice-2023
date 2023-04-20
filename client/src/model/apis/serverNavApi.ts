const serverNavigation = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const userRoutes = {
    getAllUsers: '/user/allUsers',
    register: '/user/register',
    login: '/user/login',
    logout: '/user/logout',
    refresh: `${serverUrl}/user/refresh`,
  };

  const productsRoutes = {
    getAllProducts: '/products/allProducts',
  };

  return {
    userRoutes,
    productsRoutes,
  };
};

export const serverNavApi = serverNavigation();
