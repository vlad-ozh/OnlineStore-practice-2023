import { createAsyncThunk, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import {
  IProductsCategory,
  IProductsByBrandData,
  IProduct,
} from '../types/IProducts';
import { serverNavApi } from './serverNavApi';
import axiosInstance from '../../http';

interface IProductsApi {
  getCategoryInfo:
    AsyncThunk<IProductsCategory, string, {rejectValue: string}>;
  getProductsByBrand:
    AsyncThunk<IProduct[], IProductsByBrandData, {rejectValue: string}>;
  error: any;
}
const products = (): IProductsApi => {
  const categoryInfo = () =>
    createAsyncThunk<IProductsCategory, string, {rejectValue: string}>(
      'products/getCategoryInfo',
      async (category, { rejectWithValue }) => {
        return await axiosInstance
          .get<IProductsCategory>(serverNavApi.toGetCategory(category))
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const productsByBrand = () =>
    createAsyncThunk<IProduct[], IProductsByBrandData, {rejectValue: string}>(
      'products/getProductsByBrand',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .get<IProduct[]>(
            serverNavApi.toGetProductsByBrand(data.category, data.brand)
          )
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
  };

  return {
    getCategoryInfo: categoryInfo(),
    getProductsByBrand: productsByBrand(),
    error: isError,
  };
};

export const productsApi = products();
