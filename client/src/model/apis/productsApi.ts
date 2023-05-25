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
  getSearchProducts: AsyncThunk<IProduct[], string, {rejectValue: string}>;
  getSelectedProducts: AsyncThunk<IProduct[], string, {rejectValue: string}>;
  getProductsInCart: AsyncThunk<IProduct[], string, {rejectValue: string}>;
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

  const searchProducts = () =>
    createAsyncThunk<IProduct[], string, {rejectValue: string}>(
      'products/getSearchProducts',
      async (userId, { rejectWithValue }) => {
        return await axiosInstance
          .get<IProduct[]>(
            serverNavApi.toGetSearchProducts(userId)
          )
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const selectedProducts = () =>
    createAsyncThunk<IProduct[], string, {rejectValue: string}>(
      'products/getSelectedProducts',
      async (userId, { rejectWithValue }) => {
        return await axiosInstance
          .get<IProduct[]>(
            serverNavApi.toGetSelectedProducts(userId)
          )
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const productsInCart = () =>
    createAsyncThunk<IProduct[], string, {rejectValue: string}>(
      'products/getProductsInCart',
      async (userId, { rejectWithValue }) => {
        return await axiosInstance
          .get<IProduct[]>(
            serverNavApi.toGetProductsInCart(userId)
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
    getSearchProducts: searchProducts(),
    getSelectedProducts: selectedProducts(),
    getProductsInCart: productsInCart(),
    error: isError,
  };
};

export const productsApi = products();
