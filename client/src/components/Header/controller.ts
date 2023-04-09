import { navigationApi } from './../../model/navigationApi';
// import { usersService, productsService } from './../../model/services';
import { AppDispatch } from './../../model/store/store';

export const controller = (dispatch: AppDispatch) => {
  // const {} = usersService();
  // const {} = productsService();

  return {
    onHome: () => {
      return navigationApi.toHome();
    },
    onProducts: () => {
      return navigationApi.toProducts();
    },
    onChangeSearch: (value: string) => {
    },
    onAccount: () => {
      return navigationApi.toAccountLogin();
    },
    onSearch: () => {

    },

  };
};
