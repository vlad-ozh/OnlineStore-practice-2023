// import { navigationApi } from '../../model/navigationApi';
import { usersService, productsService } from './../../model/services';
import { AppDispatch } from './../../model/store/store';

export const controller = (dispatch: AppDispatch) => {
  const {
    getAllUsers,
  } = usersService();
  const {
    getAllProducts,
  } = productsService();

  return {
    getAllUsers: () => {
      dispatch(getAllUsers());
    },
    getAllProducts: () => {
      dispatch(getAllProducts());
    },
  };
};
