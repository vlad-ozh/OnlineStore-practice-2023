import { navigationApi, userApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';
import { IReview } from '../../model/types/IProducts';
import { IUserCart } from '../../model/types/IUser';

export const controller = (dispatch: AppDispatch) => {
  return {
    onSelect: (userId: string, productId: string) => {
      if (userId !== undefined) {
        dispatch(userApi.addProductToSelected({userId, productId}));
      }
    },
    onRemoveSelected: (userId: string, productId: string) => {
      if (userId !== undefined) {
        dispatch(userApi.removeProductFromSelected({userId, productId}));
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
    onCart: (userId: string, productId: string) => {
      if (userId !== undefined) {
        dispatch(userApi.addProductToCart({userId, productId}));
      }
    },
    getLinkToCart: () => {
      return navigationApi.toAccountCart();
    },
    isCart: (productId: string, cart: IUserCart[]) => {
      if (cart !== undefined) {
        return Boolean(
          cart.find(product => product.id === productId)
        );
      }

      return false;
    },
    getProductLink: (category: string, brand: string, productId: string) => {
      return navigationApi.toProduct(category, brand, productId);
    },
    getLoginLink: () => {
      return navigationApi.toAccountLogin();
    },
    getRating: (reviews: IReview[]) => {
      let sum = 0;

      reviews.forEach(review => sum += review.rating);

      const rating = sum !== 0 ?
        Math.round((sum / reviews.length) * 10) / 10 : 0;

      return rating;
    },
  };
};
