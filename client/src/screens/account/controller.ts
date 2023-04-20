import { navigationApi, userApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';

export const controller = (dispatch: AppDispatch) => {
  return {
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
