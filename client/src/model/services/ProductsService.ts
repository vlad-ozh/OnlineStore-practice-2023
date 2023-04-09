import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import { IProducts } from '../types/IProducts';
import { navigationApi } from '../navigationApi';

interface IProductsService {
  getAllProducts: AsyncThunk<IProducts, undefined, {rejectValue: string}>;
  error: any;
}
export const productsService = (): IProductsService => {
  const {
    getAllProducts,
  } = navigationApi.queryProductsRoutes;

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
