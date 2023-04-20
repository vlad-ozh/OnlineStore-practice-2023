import { IProducts } from '../../types/IProducts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from '../../apis';

interface IProductsState {
  products: IProducts;
  loading: boolean;
  error: string | null;
};

const initialState: IProductsState = {
  products: {
    smartphones: [],
    tablets: [],
    laptops: [],
  },
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsApi.getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productsApi.getAllProducts.fulfilled, (state, action) => {
        const data: IProducts = action.payload;
        state.products = data; // I need to check this
        state.loading = false;
      })
      .addMatcher(productsApi.error, (
        state, action: PayloadAction<string>
      ) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const productsReducer = productsSlice.reducer;
