import { navigationApi, userApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';

export const controller = (dispatch: AppDispatch) => {
  return {
    onSelect: (userId: string, productId: string) => {
      if (userId !== undefined) {
        dispatch(userApi.addProductToSelected({userId, productId}));
      }
    },
    isSelect: (productId: string, selectedProducts: string[]) => {
      if (selectedProducts !== undefined) {
        return Boolean(
          selectedProducts.find(product => product === productId)
        );
      }

      return false;
    },
    getProductLink: (category: string, brand: string, productId: string) => {
      return navigationApi.toProduct(category, brand, productId);
    },
  };
};
