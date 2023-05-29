import { createAsyncThunk, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import {
  IProductsCategory,
  IProductsByBrandData,
  IProduct,
  ICreateReview,
} from '../types/IProducts';
import { serverNavApi } from './serverNavApi';
import axiosInstance from '../../http';

interface IProductsApi {
  getCategoryInfo:
    AsyncThunk<IProductsCategory, string, {rejectValue: string}>;
  getCategories:
    AsyncThunk<IProductsCategory[], undefined, {rejectValue: string}>;
  getProductsByBrand:
    AsyncThunk<IProduct[], IProductsByBrandData, {rejectValue: string}>;
  getSearchProducts: AsyncThunk<IProduct[], string, {rejectValue: string}>;
  getSelectedProducts: AsyncThunk<IProduct[], string, {rejectValue: string}>;
  getProductsInCart: AsyncThunk<IProduct[], string, {rejectValue: string}>;
  getProduct: AsyncThunk<IProduct, string, {rejectValue: string}>;
  createReview: AsyncThunk<IProduct, ICreateReview, {rejectValue: string}>;
  getPopularProducts: AsyncThunk<IProduct[], undefined, {rejectValue: string}>;
  getPopularByCategory:
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

  const categories = () =>
    createAsyncThunk<IProductsCategory[], undefined, {rejectValue: string}>(
      'products/getCategories',
      async (_, { rejectWithValue }) => {
        return await axiosInstance
          .get<IProductsCategory[]>(serverNavApi.productsRoutes.getCategories)
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

  const product = () =>
    createAsyncThunk<IProduct, string, {rejectValue: string}>(
      'products/getProduct',
      async (productId, { rejectWithValue }) => {
        return await axiosInstance
          .get<IProduct>(
            serverNavApi.toGetProduct(productId)
          )
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const createReview = () =>
    createAsyncThunk<IProduct, ICreateReview, {rejectValue: string}>(
      'products/create-review',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .put<IProduct>(
            serverNavApi.productsRoutes.createReview, data
          )
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const popularProducts = () =>
    createAsyncThunk<IProduct[], undefined, {rejectValue: string}>(
      'products/popular',
      async (_, { rejectWithValue }) => {
        return await axiosInstance
          .get<IProduct[]>(serverNavApi.productsRoutes.getPopular)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  const popularByCategory = () =>
    createAsyncThunk<IProduct[], IProductsByBrandData, {rejectValue: string}>(
      'products/popular-by-category',
      async (data, { rejectWithValue }) => {
        return await axiosInstance
          .get<IProduct[]>(
            serverNavApi.toGetPopularByCategory(data.category, data.brand)
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
    getCategories: categories(),
    getProductsByBrand: productsByBrand(),
    getSearchProducts: searchProducts(),
    getSelectedProducts: selectedProducts(),
    getProductsInCart: productsInCart(),
    getProduct: product(),
    createReview: createReview(),
    getPopularProducts: popularProducts(),
    getPopularByCategory: popularByCategory(),
    error: isError,
  };
};

export const productsApi = products();
