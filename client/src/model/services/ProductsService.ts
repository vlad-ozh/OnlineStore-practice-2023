import axios from 'axios';
import { createAsyncThunk, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import { IProducts } from '../types/IProducts';

interface IProductsService {
  getAllProducts: AsyncThunk<IProducts, undefined, {rejectValue: string}>;
  error: any;
}
export const productsService = (): IProductsService => {

  const allProducts = () => {
    return createAsyncThunk<IProducts, undefined, {rejectValue: string}>(
      'products/allProducts',
      async (_, { rejectWithValue }) => {
        return await axios
          .get('http://localhost:3100/products/allProducts')
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
