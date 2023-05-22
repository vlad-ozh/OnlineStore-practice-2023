import axiosInstance from '../../http';
import { serverNavApi } from './serverNavApi';
import { createAsyncThunk, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import {
  IUser,
  IUserRegister,
  IUserLogin,
  IUserResponse,
  IUserForgotPassword,
  IUserResetPassword,
  IUserAddToSelected,
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
    AsyncThunk<IUserResponse, IUserResetPassword, {rejectValue: string}>;
  addProductToSelected:
    AsyncThunk<IUser, IUserAddToSelected, {rejectValue: string}>;
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
    createAsyncThunk<IUserResponse, IUserResetPassword, {rejectValue: string}>(
      'user/reset/password',
      async ({password, isToken, token}, { rejectWithValue }) => {
        return await axiosInstance
          .post<IUserResponse>(
            serverNavApi.toResetPassword(token),
            {password, isToken}
          )
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  const addProductToSelected = () =>
    createAsyncThunk<IUser, IUserAddToSelected, {rejectValue: string}>(
      'user/add/product-to-selected',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .put<IUser>(serverNavApi.userRoutes.addProductToSelected, data)
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
    error: isError,
  };
};

export const userApi = user();
