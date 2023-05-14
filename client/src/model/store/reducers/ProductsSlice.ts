import {
  IProducts,
  IProductsCategories,
  IProductsCategory,
} from '../../types/IProducts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from '../../apis';

interface IProductsState {
  products: IProducts;
  categories: IProductsCategories;
  category: IProductsCategory | null;
  loading: boolean;
  error: string | null;
};

const initialState: IProductsState = {
  products: {} as IProducts,
  categories: {
    smartphones: 'smartphones',
    tablets: 'tablets',
    laptops: 'laptops',
    headphones: 'headphones',
    televisions: 'televisions',
  },
  category: null,
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsApi.getCategoryInfo.pending, (state) => {
        state.category = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(productsApi.getCategoryInfo.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addMatcher(productsApi.error, (
        state, action: PayloadAction<any>
      ) => {
        const errorMsg = action.payload?.response?.data?.message;
        const error = errorMsg ? errorMsg : null;
        state.error = error;
        state.loading = false;
      });
  },
});

export const productsReducer = productsSlice.reducer;
