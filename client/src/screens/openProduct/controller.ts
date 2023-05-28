import { AppDispatch } from '../../model/store/store';
import { navigationApi, productsApi, userApi } from '../../model/apis';
import { IUserCart } from '../../model/types/IUser';
import { IReview } from '../../model/types/IProducts';

export const controller = (dispatch: AppDispatch) => {
  const getParams = () =>
    navigationApi.getPathParams(navigationApi.routes.openProduct);

  return {
    getProduct: () => {
      const productId = getParams().productId;

      dispatch(productsApi.getProduct(`${productId}`));
    },
    getBreadcrumbsPaths: (productName: string) => {
      const categoryName = getParams().category;
      const brand = getParams().brand;

      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: navigationApi.toProductsCategories(), name: {title: 'products'}},
        {
          path: navigationApi.toProductsCategory(`${categoryName}`),
          name: {title: `${categoryName}`},
        },
        {
          path: navigationApi.toProducts(`${categoryName}`,`${brand}`),
          name: {title: `${brand}`},
        },
        {path: '', name: {title: productName}},
      ];

      return breadcrumbsPaths;
    },
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
    getLoginLink: () => {
      return navigationApi.toAccountLogin();
    },
    createReview: (
      userId: string,
      productId: string,
      text: string,
      rating: number ) => {
      if (text.length !== 0 && rating !== 0) {
        dispatch(productsApi.createReview({ productId, rating, text, userId}));
      }
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
