import { navigationApi, userApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';
import { IUserLogin } from '../../model/types/IUser';

export const controller = (dispatch: AppDispatch) => {

  return {
    getBreadcrumbsPaths: () => {
      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: '', name: {title: 'login'}},
      ];

      return breadcrumbsPaths;
    },
    getRegisterLink: () => {
      return navigationApi.toAccountRegister();
    },
    getForgotPasswordLink: () => {
      return navigationApi.toAccountForgotPassword();
    },
    getAccountLink: () => {
      return navigationApi.toAccount();
    },
    onLogin: (user: IUserLogin) => {
      dispatch(userApi.login(user));
    },
  };
};
