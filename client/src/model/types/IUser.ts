export interface IUserRegister {
  email: string;
  name: string;
  password: string;
};
export interface IUserRegisterConfirm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};
export interface IUserLogin {
  email: string;
  password: string;
};
export interface IUser {
  email: string;
  name: string;
  id: string;
  isActivated: boolean;
  isAuth: boolean;
  selectedProducts: string[];
  // cart: IProduct[];
};
export interface IUserResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
export interface IUserForgotPassword {
  email: string;
}
export interface IUserResetPassword {
  password: string;
  isToken: boolean;
  token: string;
}
export interface IUserResetPasswordData {
  password: string;
  confirmPassword: string;
  isToken: boolean;
}
export interface IUserAddToSelected {
  userId: string;
  productId: string;
}
