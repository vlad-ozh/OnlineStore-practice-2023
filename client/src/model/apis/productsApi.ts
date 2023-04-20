import axios from 'axios';
import { createAsyncThunk, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import { IProducts } from '../types/IProducts';
import { serverNavApi } from './serverNavApi';

interface IProductsApi {
  getAllProducts: AsyncThunk<IProducts, undefined, {rejectValue: string}>;
  error: any;
}
const products = (): IProductsApi => {
  const {
    getAllProducts,
  } = serverNavApi.productsRoutes;

  const allProducts = () => {
    return createAsyncThunk<IProducts, undefined, {rejectValue: string}>(
      'products/allProducts',
      async (_, { rejectWithValue }) => {
        return await axios
          .get(getAllProducts)
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );
  };

  const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
  };

  return {
    getAllProducts: allProducts(),
    error: isError,
  };
};

export const productsApi = products();
