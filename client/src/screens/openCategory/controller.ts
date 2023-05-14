import { AppDispatch } from '../../model/store/store';
import { navigationApi, productsApi } from '../../model/apis';

export const controller = (dispatch: AppDispatch) => {
  const getParams = () =>
    navigationApi.getPathParams(navigationApi.routes.openProductsCategory);

  return {
    getCategory: () => {
      const category = getParams().category;
      const validCategory = category !== undefined ? category : '';

      dispatch(productsApi.getCategoryInfo(validCategory));
    },
    getBreadcrumbsPaths: () => {
      const categoryName = getParams().category;

      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: navigationApi.toProductsCategories(), name: {title: 'products'}},
        {path: '', name: {title: `${categoryName}`}},
      ];

      return breadcrumbsPaths;
    },
    getProductsLink: (brand: string) => {
      const category = getParams().category;
      const validCategory = category !== undefined ? category : '';

      return navigationApi.toProducts(validCategory, brand);
    },
  };
};
