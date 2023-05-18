import { navigationApi, productsApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';

export const controller = (dispatch: AppDispatch) => {
  const getParams = () =>
    navigationApi.getPathParams(navigationApi.routes.searchProducts);

  return {
    getProducts: () => {
      const searchData = getParams().data;

      dispatch(productsApi.getSearchProducts(`${searchData}`));
    },
    getBreadcrumbsPaths: () => {
      const searchData = getParams().data;

      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: navigationApi.toProductsCategories(), name: {title: 'products'}},
        {path: '', name: {title: 'search', settings: { search: searchData}}},
      ];

      return breadcrumbsPaths;
    },
    getProductLink: (category: string, brand: string, productId: string) => {
      return navigationApi.toProduct(category, brand, productId);
    },
  };
};
