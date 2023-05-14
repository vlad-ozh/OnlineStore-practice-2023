import { navigationApi } from '../../model/apis';
import { AppDispatch } from '../../model/store/store';

export const controller = (dispatch: AppDispatch) => {

  return {
    getBreadcrumbsPaths: (searchData: string) => {
      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: navigationApi.toProductsCategories(), name: {title: 'products'}},
        {path: '', name: {title: 'search', settings: { search: searchData}}},
      ];

      return breadcrumbsPaths;
    },
  };
};
