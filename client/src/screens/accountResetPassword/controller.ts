import { IUserResetPasswordData } from '../../model/types/IUser';
import { navigationApi, userApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';

export const controller = (dispatch: AppDispatch) => {

  return {
    getBreadcrumbsPaths: () => {
      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: '', name: {title: 'forgotPassword'}},
      ];

      return breadcrumbsPaths;
    },
    getLoginLink: () => {
      return navigationApi.toAccountLogin();
    },
    getAccountLink: () => {
      return navigationApi.toAccount();
    },
    checkToken: (token: string) => {
      dispatch(userApi.checkToken(token));
    },
    onReset: (user: IUserResetPasswordData) => {
      const { password, confirmPassword, isToken, token } = user;

      if (password !== confirmPassword) return;

      dispatch(userApi.resetPassword({password, isToken, token}));
    },
  };
};
