import { userApi } from './../../model/services/UserService';
import { AppDispatch } from './../../model/store/store';

export const controller = (dispatch: AppDispatch) => {
  const {getAllUsers} = userApi();

  return {
    getAllUsers: () => {
      dispatch(getAllUsers());
    },
  };
};
