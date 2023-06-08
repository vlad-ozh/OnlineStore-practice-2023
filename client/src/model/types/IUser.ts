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
export interface IUserCart {
  id: string;
  amount: number;
};
export interface IUser {
  email: string;
  name: string;
  id: string;
  isActivated: boolean;
  isAuth: boolean;
  selectedProducts: string[];
  cart: IUserCart[];
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
export interface IUserCartSelectedOperations  {
  userId: string;
  productId: string;
}
export interface IChangeAmountProductBuy  {
  userId: string;
  productId: string;
  amount: number;
  value: number;
}
export interface ICheckout  {
  name: string,
  phone: string,
  city: string,
  postNum: number,
}
