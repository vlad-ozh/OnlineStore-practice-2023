import axiosInstance from '../../http';
import { serverNavApi } from './serverNavApi';
import { createAsyncThunk, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import {
  IUser,
  IUserRegister,
  IUserLogin,
  IUserResponse,
} from '../types/IUser';
import axios from 'axios';

interface IUserApi {
  getAll: AsyncThunk<IUser[], undefined, {rejectValue: string}>;
  register: AsyncThunk<IUserResponse, IUserRegister, {rejectValue: string}>;
  login: AsyncThunk<IUserResponse, IUserLogin, {rejectValue: string}>;
  logout: AsyncThunk<void, undefined, {rejectValue: string}>;
  refresh: AsyncThunk<IUserResponse, undefined, {rejectValue: string}>;
  error: any;
}
const user = (): IUserApi => {

  const getAll = () =>
    createAsyncThunk<IUser[], undefined, {rejectValue: string}>(
      'user/allUsers',
      async (_, { rejectWithValue }) => {
        return await axiosInstance
          .get<IUser[]>(serverNavApi.userRoutes.getAllUsers)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

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
    createAsyncThunk<void, undefined, {rejectValue: string}>(
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

  const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
  };

  return {
    getAll: getAll(),
    register: register(),
    login: login(),
    logout: logout(),
    refresh: refresh(),
    error: isError,
  };
};

export const userApi = user();
