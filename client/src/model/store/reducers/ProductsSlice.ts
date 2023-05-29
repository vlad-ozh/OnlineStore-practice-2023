import {
  IProduct,
  IProductsCategories,
  IProductsCategory,
} from '../../types/IProducts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsApi } from '../../apis';

interface IProductsState {
  products: IProduct[];
  popularProducts: IProduct[];
  product: IProduct;
  categoriesNames: IProductsCategories;
  categories: IProductsCategory[];
  category: IProductsCategory | null;
  search: string;
  loading: boolean;
  error: string | null;
};

const initialState: IProductsState = {
  products: [] as IProduct[],
  popularProducts: [] as IProduct[],
  product: {} as IProduct,
  categoriesNames: {
    smartphones: 'smartphones',
    tablets: 'tablets',
    laptops: 'laptops',
    headphones: 'headphones',
    televisions: 'televisions',
  },
  categories: [] as IProductsCategory[],
  category: null,
  search: '',
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
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

      .addCase(productsApi.getCategories.pending, (state) => {
        state.categories = [] as IProductsCategory[];
        state.category = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(productsApi.getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })

      .addCase(productsApi.getProductsByBrand.pending, (state) => {
        state.products = [] as IProduct[];
        state.loading = true;
        state.error = null;
      })
      .addCase(productsApi.getProductsByBrand.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })

      .addCase(productsApi.getSearchProducts.pending, (state) => {
        state.products = [] as IProduct[];
        state.loading = true;
        state.error = null;
      })
      .addCase(productsApi.getSearchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })

      .addCase(productsApi.getSelectedProducts.pending, (state) => {
        state.products = [] as IProduct[];
        state.loading = true;
        state.error = null;
      })
      .addCase(productsApi.getSelectedProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })

      .addCase(productsApi.getProductsInCart.pending, (state) => {
        state.products = [] as IProduct[];
        state.loading = true;
        state.error = null;
      })
      .addCase(productsApi.getProductsInCart.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })

      .addCase(productsApi.getProduct.pending, (state) => {
        state.product = {} as IProduct;
        state.loading = true;
        state.error = null;
      })
      .addCase(productsApi.getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })

      .addCase(productsApi.createReview.pending, (state) => {
        state.product = {} as IProduct;
        state.loading = true;
        state.error = null;
      })
      .addCase(productsApi.createReview.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })

      .addCase(productsApi.getPopularProducts.pending, (state) => {
        state.popularProducts = [] as IProduct[];
        state.loading = true;
        state.error = null;
      })
      .addCase(productsApi.getPopularProducts.fulfilled, (state, action) => {
        state.popularProducts = action.payload;
        state.loading = false;
      })

      .addCase(productsApi.getPopularByCategory.pending, (state) => {
        state.popularProducts = [] as IProduct[];
        state.loading = true;
        state.error = null;
      })
      .addCase(productsApi.getPopularByCategory.fulfilled, (state, action) => {
        state.popularProducts = action.payload;
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

export const productsActions = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
