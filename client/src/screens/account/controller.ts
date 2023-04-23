import { navigationApi, userApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';

export const controller = (dispatch: AppDispatch) => {
  return {
    getBreadcrumbsPaths: () => {
      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: '', name: {title: 'profile'}},
      ];

      return breadcrumbsPaths;
    },
    onLogout: () => {
      dispatch(userApi.logout());
    },
    getAccountLoginLink: () => {
      return navigationApi.toAccountLogin();
    },
    getAccountInfoLink: () => {
      return navigationApi.toAccountInfo();
    },
    getAccountOrdersLink: () => {
      return navigationApi.toAccountOrders();
    },
  };
};
