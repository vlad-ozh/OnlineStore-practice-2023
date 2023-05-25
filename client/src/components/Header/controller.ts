import { productsActions } from '../../model/store/reducers/ProductsSlice';
import { IUserCart } from '../../model/types/IUser';
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
      dispatch(productsActions.changeSearch(value));
    },
    getAccountLink: () => {
      return navigationApi.toAccount();
    },
    getSearchProductsLink: (data: string) => {
      if (data.length > 0) {
        return navigationApi.toSearchProducts(data.trim());
      } else{
        return '';
      }
    },
    getSelectedProductsLink: () => {
      return navigationApi.toSelectedProducts();
    },
    getAccountCartLink: () => {
      return navigationApi.toAccountCart();
    },
    getTotalSelectedProducts: (products: string[]) => {
      if (products !== undefined) {
        return products.length;
      }
    },
    getTotalProductsInCart: (products: IUserCart[]) => {
      if (products !== undefined) {
        return products.length;
      }
    },
  };
};
