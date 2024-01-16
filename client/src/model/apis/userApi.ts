import axiosInstance from '../../http';
import { serverNavApi } from './serverNavApi';
import { createAsyncThunk, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import {
  IUser,
  IUserRegister,
  IUserLogin,
  IUserResponse,
  IUserForgotPassword,
  IUserResetPasswordRequest,
  IUserCartSelectedOperations,
  IChangeAmountProductBuy,
  ICheckout,
  IChangeUserName,
  IUserChangePasswordData,
} from '../types/IUser';
import axios from 'axios';

interface IUserApi {
  register: AsyncThunk<IUserResponse, IUserRegister, {rejectValue: string}>;
  login: AsyncThunk<IUserResponse, IUserLogin, {rejectValue: string}>;
  logout: AsyncThunk<undefined, undefined, {rejectValue: string}>;
  refresh: AsyncThunk<IUserResponse, undefined, {rejectValue: string}>;
  forgotPassword:
    AsyncThunk<undefined, IUserForgotPassword, {rejectValue: string}>;
  checkToken: AsyncThunk<{isToken: boolean}, string, {rejectValue: string}>;
  resetPassword:
    AsyncThunk<IUserResponse, IUserResetPasswordRequest, {rejectValue: string}>;
  addProductToSelected:
    AsyncThunk<IUser, IUserCartSelectedOperations, {rejectValue: string}>;
  removeProductFromSelected:
    AsyncThunk<IUser, IUserCartSelectedOperations, {rejectValue: string}>;
  addProductToCart:
    AsyncThunk<IUser, IUserCartSelectedOperations, {rejectValue: string}>;
  removeProductFromCart:
    AsyncThunk<IUser, IUserCartSelectedOperations, {rejectValue: string}>;
  changeAmountProductBuy:
    AsyncThunk<IUser, IChangeAmountProductBuy, {rejectValue: string}>;
  validateCheckoutInfo: AsyncThunk<undefined, ICheckout, {rejectValue: string}>;
  changeUserName:
    AsyncThunk<IUserResponse, IChangeUserName, {rejectValue: string}>;
  changeUserPassword:
    AsyncThunk<IUserResponse, IUserChangePasswordData, {rejectValue: string}>;
  deleteAcc: AsyncThunk<undefined, {userId: string}, {rejectValue: string}>;
  error: any;
}
const user = (): IUserApi => {

  const register = () =>
    createAsyncThunk<IUserResponse, IUserRegister, {rejectValue: string}>(
      'user/register',
      async (user, { rejectWithValue }) => {
        return await axiosInstance
          .post<IUserResponse>(serverNavApi.userRoutes.register, user)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const login = () =>
    createAsyncThunk<IUserResponse, IUserLogin, {rejectValue: string}>(
      'user/login',
      async (user, { rejectWithValue }) => {
        return await axiosInstance
          .post<IUserResponse>(serverNavApi.userRoutes.login, user)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const logout = () =>
    createAsyncThunk<undefined, undefined, {rejectValue: string}>(
      'user/logout',
      async (_, { rejectWithValue }) => {
        return await axiosInstance
          .post(serverNavApi.userRoutes.logout)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const refresh = () =>
    createAsyncThunk<IUserResponse, undefined, {rejectValue: string}>(
      'user/refresh',
      async (_, { rejectWithValue }) => {
        return await axios
          .get<IUserResponse>(
            serverNavApi.userRoutes.refresh,
            {withCredentials: true}
          )
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const forgotPassword = () =>
    createAsyncThunk<undefined, IUserForgotPassword, {rejectValue: string}>(
      'user/forgot/password',
      async (email, { rejectWithValue }) => {
        return await axiosInstance
          .post(serverNavApi.userRoutes.forgotPassword, email)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const checkToken = () =>
    createAsyncThunk<{isToken: boolean}, string, {rejectValue: string}>(
      'user/check/token',
      async (token, { rejectWithValue }) => {
        return await axiosInstance
          .get<{isToken: boolean}>(serverNavApi.toCheckToken(token))
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  const resetPassword = () =>
    createAsyncThunk<IUserResponse, IUserResetPasswordRequest, {
      rejectValue: string
    }>(
      'user/reset/password',
      async ({password, token}, { rejectWithValue }) => {
        return await axiosInstance
          .post<IUserResponse>(
            serverNavApi.toResetPassword(token),
            {password}
          )
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  const addProductToSelected = () =>
    createAsyncThunk<IUser, IUserCartSelectedOperations, {rejectValue: string}>(
      'user/add/product-to-selected',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .put<IUser>(serverNavApi.userRoutes.addProductToSelected, data)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  const removeProductFromSelected = () =>
    createAsyncThunk<IUser, IUserCartSelectedOperations, {rejectValue: string}>(
      'user/remove/product-from-selected',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .put<IUser>(serverNavApi.userRoutes.removeProductFromSelected, data)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  const addProductToCart = () =>
    createAsyncThunk<IUser, IUserCartSelectedOperations, {rejectValue: string}>(
      'user/add/product-to-cart',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .put<IUser>(serverNavApi.userRoutes.addProductToCart, data)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  const removeProductFromCart = () =>
    createAsyncThunk<IUser, IUserCartSelectedOperations, {rejectValue: string}>(
      'user/remove/product-from-cart',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .put<IUser>(serverNavApi.userRoutes.removeProductFromCart, data)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  const changeAmountProductBuy = () =>
    createAsyncThunk<IUser, IChangeAmountProductBuy, {rejectValue: string}>(
      'user/change/amount-product-buy',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .put<IUser>(serverNavApi.userRoutes.changeAmountProductBuy, data)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  const validateCheckoutInfo = () =>
    createAsyncThunk<undefined, ICheckout, {rejectValue: string}>(
      'user/validate/checkout/info',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .post<undefined>(serverNavApi.userRoutes.validateCheckoutInfo, data)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  const changeUserName = () =>
    createAsyncThunk<IUserResponse, IChangeUserName, {rejectValue: string}>(
      'user/change/name',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .patch<IUserResponse>(serverNavApi.userRoutes.changeName, data)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  const changeUserPassword = () =>
    createAsyncThunk<IUserResponse, IUserChangePasswordData, {
      rejectValue: string
    }>(
      'user/change/password',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .patch<IUserResponse>(serverNavApi.userRoutes.changePassword, data)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  const deleteAcc = () =>
    createAsyncThunk<undefined, {userId: string}, {rejectValue: string}>(
      'user/delete/account',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .delete<undefined>(serverNavApi.toDeleteAcc(data.userId))
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
  };

  return {
    register: register(),
    login: login(),
    logout: logout(),
    refresh: refresh(),
    forgotPassword: forgotPassword(),
    checkToken: checkToken(),
    resetPassword: resetPassword(),
    addProductToSelected: addProductToSelected(),
    removeProductFromSelected: removeProductFromSelected(),
    addProductToCart: addProductToCart(),
    removeProductFromCart: removeProductFromCart(),
    changeAmountProductBuy: changeAmountProductBuy(),
    validateCheckoutInfo: validateCheckoutInfo(),
    changeUserName: changeUserName(),
    changeUserPassword: changeUserPassword(),
    deleteAcc: deleteAcc(),
    error: isError,
  };
};

export const userApi = user();
