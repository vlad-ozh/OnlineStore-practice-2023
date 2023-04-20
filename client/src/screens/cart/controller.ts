import { AppDispatch } from '../../model/store/store';
import { navigationApi } from '../../model/apis';

export const controller = (dispatch: AppDispatch) => {

  return {
    getAccountLoginLink: () => {
      return navigationApi.toAccountLogin();
    },
  };
};
