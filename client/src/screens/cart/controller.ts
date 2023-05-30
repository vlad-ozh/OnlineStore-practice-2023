import { AppDispatch } from '../../model/store/store';
import { navigationApi, productsApi, userApi } from '../../model/apis';
import { IUserCart } from '../../model/types/IUser';
import { IProduct } from '../../model/types/IProducts';

export const controller = (dispatch: AppDispatch) => {

  return {
    getProducts: (userId: string) => {
      dispatch(productsApi.getProductsInCart(userId));
    },
    getBreadcrumbsPaths: () => {
      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: navigationApi.toAccount(), name: {title: 'profile'}},
        {path: '', name: {title: 'cart'}},
      ];

      return breadcrumbsPaths;
    },
    getAccountLoginLink: () => {
      return navigationApi.toAccountLogin();
    },
    removeProduct: (userId: string, productId: string) => {
      dispatch(userApi.removeProductFromCart({ userId, productId }));
    },
    getAmountProduct: (cart: IUserCart[], productId: string) => {
      const product = cart.find(product => product.id === productId);

      if (product === undefined) {
        return 1;
      }

      return product.amount;
    },
    changeAmount: (
      userId: string,
      productId: string,
      amount: number,
      value: number
    ) => {
      dispatch(userApi.changeAmountProductBuy({
        userId,
        productId,
        amount,
        value,
      }));
    },
    getProductPrice: (
      cart: IUserCart[],
      productId: string,
      productPrice: number
    ) => {
      const product = cart.find(product => product.id === productId);

      if (product === undefined) {
        return productPrice.toLocaleString();
      }

      return (productPrice * product.amount).toLocaleString();
    },
    getTotalPrice: (cart: IUserCart[], products: IProduct[]) => {
      let totalPrice = 0;
      products.forEach(product => {
        const prod = cart.find(prod => prod.id === product.id);

        if (prod === undefined) {
          return totalPrice += product.price;
        }

        return totalPrice += product.price * prod.amount;
      });

      return totalPrice.toLocaleString();
    },
    getProductLink: (category: string, brand: string, productId: string) => {
      return navigationApi.toProduct(category, brand, productId);
    },
  };
};
