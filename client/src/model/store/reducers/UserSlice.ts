import { IUser } from '../../types/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../../apis';

interface IUserState {
  user: IUser;
  isResetPasswordEmailSent: boolean;
  email: string;
  isToken: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: IUserState = {
  user: {} as IUser,
  isResetPasswordEmailSent: false,
  email: '',
  isToken: true,
  loading: false,
  error: null,
};
// в кожному товарі в функцію кидати айді та перевіряти чи є воно в масиві
// вибраних товарів, повертати булеан
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toResetPassword: (state) => {
      state.isResetPasswordEmailSent = false;
    },
    changeEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userApi.register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('token', action.payload.accessToken);
      })

      .addCase(userApi.login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('token', action.payload.accessToken);
      })

      .addCase(userApi.logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.logout.fulfilled, (state) => {
        state.user = {} as IUser;
        state.loading = false;
        localStorage.removeItem('token');
      })

      .addCase(userApi.refresh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(userApi.refresh.rejected, (state) => {
        state.loading = false;
        localStorage.removeItem('token');
      })

      .addCase(userApi.forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.isResetPasswordEmailSent = true;
      })

      .addCase(userApi.checkToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.checkToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isToken = action.payload.isToken;
      })

      .addCase(userApi.resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.accessToken);
      })

      .addCase(userApi.addProductToSelected.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.addProductToSelected.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(userApi.removeProductFromSelected.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.removeProductFromSelected.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(userApi.addProductToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(userApi.removeProductFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.removeProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(userApi.changeAmountProductBuy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.changeAmountProductBuy.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addMatcher(userApi.error, (
        state, action: PayloadAction<any>
      ) => {
        const errorMsg = action.payload?.response?.data?.message;
        const error = errorMsg ? errorMsg : null;
        state.error = error;
        state.loading = false;
      });
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
