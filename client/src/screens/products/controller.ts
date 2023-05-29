import { navigationApi, productsApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';

export const controller = (dispatch: AppDispatch) => {

  return {
    getBreadcrumbsPaths: () => {
      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: '', name: {title: 'products'}},
      ];

      return breadcrumbsPaths;
    },
    getCategories: () => {
      dispatch(productsApi.getCategories());
    },
    getProductsLink: (category: string, brand: string) => {
      return navigationApi.toProducts(category, brand);
    },
  };
};
