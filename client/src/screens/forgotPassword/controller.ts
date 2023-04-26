import { navigationApi, userApi } from '../../model/apis';
import { userActions } from '../../model/store/reducers/UserSlice';
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
    getAccountLink: () => {
      return navigationApi.toAccount();
    },
    onChangeEmail: (email: string) => {
      dispatch(userActions.changeEmail(email));
    },
    onReset: (email: string) => {
      dispatch(userApi.forgotPassword({ email }));
    },
    onBack: () => {
      dispatch(userActions.toResetPassword());
    },
  };
};
