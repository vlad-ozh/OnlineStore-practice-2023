import { AppDispatch } from '../../model/store/store';
import { navigationApi, userApi } from '../../model/apis';
import { ICheckout } from '../../model/types/IUser';
import { userActions } from '../../model/store/reducers/UserSlice';

export const controller = (dispatch: AppDispatch) => {

  return {
    getBreadcrumbsPaths: () => {
      const breadcrumbsPaths = [
        {path: navigationApi.toHome(), name: {title: 'home'}},
        {path: navigationApi.toAccount(), name: {title: 'profile'}},
        {path: '', name: {title: 'checkout'}},
      ];

      return breadcrumbsPaths;
    },
    getCartLink: () => {
      return navigationApi.toAccountCart();
    },
    onNext: (checkoutInfo: ICheckout, error: string | null) => {
      const {
        city,
        name,
        phone,
        postNum,
      } = checkoutInfo;

      if (
        name !== '' &&
        city !== '' &&
        phone !== '' &&
        postNum !== 0 &&
        error === null
      ) {
        dispatch(userActions.changeCheckoutInfo(checkoutInfo));
        return navigationApi.toCheckoutConfirm();
      }

      return '';
    },
    validate: (checkoutInfo: ICheckout) => {
      dispatch(userApi.validateCheckoutInfo(checkoutInfo));
    },
  };
};
