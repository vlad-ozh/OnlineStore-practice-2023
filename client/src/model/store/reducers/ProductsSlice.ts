import { IProducts } from '../../types/IProducts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsService } from '../../services';

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
      .addCase(productsService().getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productsService().getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addMatcher(productsService().error, (
        state, action: PayloadAction<string>
      ) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const productsReducer = productsSlice.reducer;
