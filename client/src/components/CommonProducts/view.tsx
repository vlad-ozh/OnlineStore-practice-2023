import React from 'react';
import { ICommonProductsLogic, IReview } from '../../model/types/IProducts';
import { navigationApi, userApi } from '../../model/apis';
import { IUserCart } from '../../model/types/IUser';
import { useAppDispatch } from '../../hooks';


interface IProps {
  children: (commonLogic: ICommonProductsLogic) => React.ReactNode;
}

export const CommonProducts: React.FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const commonLogic: ICommonProductsLogic = {
    amountOfProduct: (amount: number) => {
      return Boolean(amount);
    },
    onSelect: (userId: string, productId: string) => {
      if (userId !== undefined)
        dispatch(userApi.addProductToSelected({userId, productId}));
    },
    onRemoveSelected: (userId: string, productId: string) => {
      if (userId !== undefined)
        dispatch(userApi.removeProductFromSelected({userId, productId}));
    },
    isSelect: (productId: string, selectedProducts: string[]) => {
      if (selectedProducts !== undefined)
        return selectedProducts.some(product => product === productId);

      return false;
    },
    onCart: (userId: string, productId: string) => {
      if (userId !== undefined)
        dispatch(userApi.addProductToCart({userId, productId}));
    },
    toCart: () => {
      return navigationApi.toAccountCart();
    },
    isCart: (productId: string, cart: IUserCart[]) => {
      if (cart !== undefined)
        return cart.some(product => product.id === productId);

      return false;
    },
    toProduct: (category: string, brand: string, productId: string) => {
      return navigationApi.toProduct(category, brand, productId);
    },
    toLogin: () => {
      return navigationApi.toAccountLogin();
    },
    totalRating: (reviews: IReview[]) => {
      if (reviews.length > 0) {
        let sum = 0;

        reviews.forEach(review => sum += review.rating);

        const rating = Math.round((sum / reviews.length) * 10) / 10 ;

        return rating;
      }

      return 0;
    },
  };

  return (
    <>
      {children(commonLogic)}
    </>
  );
};
