import { AppDispatch } from '../../model/store/store';
import { navigationApi, productsApi } from '../../model/apis';

export const controller = (dispatch: AppDispatch) => {
  const getParams = () =>
    navigationApi.getPathParams(navigationApi.routes.openProducts);

  return {
    getProducts: () => {
      const category = getParams().category;
      const brand = getParams().brand;

      dispatch(productsApi.getProductsByBrand({
        category: `${category}`, brand: `${brand}`,
      }));
    },
    getBreadcrumbsPaths: () => {
      const categoryName = getParams().category;
      const brand = getParams().brand;

      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: navigationApi.toProductsCategories(), name: {title: 'products'}},
        {
          path: navigationApi.toProductsCategory(`${categoryName}`),
          name: {title: `${categoryName}`},
        },
        {path: '', name: {title: `${brand}`}},
      ];

      return breadcrumbsPaths;
    },
    getPopularProducts: () => {
      const categoryName = getParams().category;
      const brand = getParams().brand;

      dispatch(productsApi.getPopularByCategory({
        category: `${categoryName}`,
        brand: `${brand}`,
      }));
    },
  };
};
