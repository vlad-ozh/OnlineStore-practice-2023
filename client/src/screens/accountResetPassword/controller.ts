import { IUserResetPasswordData } from '../../model/types/IUser';
import { navigationApi, userApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';

export const controller = (dispatch: AppDispatch) => {
  const getParams = () => navigationApi.getPathParams(
    navigationApi.routes.accountResetPassword
  );

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
    checkToken: () => {
      const token = getParams().token;

      if (typeof token === 'string') {
        dispatch(userApi.checkToken(token));
      }
    },
    onReset: (user: IUserResetPasswordData) => {
      const { password, confirmPassword, isToken } = user;
      const token = getParams().token;

      if (password !== confirmPassword) return;

      if (typeof token === 'string') {
        dispatch(userApi.resetPassword({password, isToken, token}));
      }
    },
  };
};
