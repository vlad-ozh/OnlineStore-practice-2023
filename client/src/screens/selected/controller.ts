import { AppDispatch } from '../../model/store/store';
import { navigationApi, productsApi } from '../../model/apis';

export const controller = (dispatch: AppDispatch) => {

  return {
    getProducts: (userId: string) => {
      dispatch(productsApi.getSelectedProducts(userId));
    },
    getBreadcrumbsPaths: () => {
      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: navigationApi.toAccount(), name: {title: 'profile'}},
        {path: '', name: {title: 'selected'}},
      ];

      return breadcrumbsPaths;
    },
    getAccountLoginLink: () => {
      return navigationApi.toAccountLogin();
    },
  };
};
