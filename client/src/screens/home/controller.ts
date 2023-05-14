import { navigationApi } from '../../model/apis';
import { AppDispatch } from './../../model/store/store';

export const controller = (dispatch: AppDispatch) => {
  return {
    getBreadcrumbsPaths: () => {
      const breadcrumbsPaths = [
        {path: '', name: {title: 'home'}},
      ];

      return breadcrumbsPaths;
    },
    getCategoryLink: (category: string) => {
      return navigationApi.toProductsCategory(category);
    },
  };
};
