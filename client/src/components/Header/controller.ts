import { navigationApi } from './../../model/apis';
import { AppDispatch } from './../../model/store/store';

export const controller = (dispatch: AppDispatch) => {
  return {
    getHomeLink: () => {
      return navigationApi.toHome();
    },
    getProductsLink: () => {
      return navigationApi.toProductsCategories();
    },
    onChangeSearch: (value: string) => {
    },
    getAccountLink: () => {
      return navigationApi.toAccount();
    },
    getSearchProductsLink: (data: string) => {
      return navigationApi.toSearchProducts(data);
    },
    getSelectedProductsLink: () => {
      return navigationApi.toSelectedProducts();
    },
    getAccountCartLink: () => {
      return navigationApi.toAccountCart();
    },
  };
};
