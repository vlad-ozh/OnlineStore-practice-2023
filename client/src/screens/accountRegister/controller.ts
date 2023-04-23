import { IUserRegisterConfirm } from './../../model/types/IUser';
import { navigationApi, userApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';

export const controller = (dispatch: AppDispatch) => {

  return {
    getBreadcrumbsPaths: () => {
      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: '', name: {title: 'register'}},
      ];

      return breadcrumbsPaths;
    },
    getLoginLink: () => {
      return navigationApi.toAccountLogin();
    },
    getAccountLink: () => {
      return navigationApi.toAccount();
    },
    onCreate: (user: IUserRegisterConfirm) => {
      const { email, name, password, confirmPassword } = user;

      if (!name || !email || !password || !confirmPassword) return;
      if (password !== confirmPassword) return;

      dispatch(userApi.register({email, name, password}));
    },
  };
};
