import { ICheckout, IUser } from '../../types/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../../apis';

interface IUserState {
  user: IUser;
  userDataLoaded: boolean;
  isEmailSent: boolean;
  isToken: boolean;
  emailForForgotPassword: string;
  checkoutInfo: ICheckout;
  loading: boolean;
  error: string | null;
};

const initialState: IUserState = {
  user: {} as IUser,
  userDataLoaded: false,
  isEmailSent: false,
  isToken: true,
  emailForForgotPassword: '',
  checkoutInfo: {} as ICheckout,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeEmailForForgotPassword: (state, action: PayloadAction<string>) => {
      state.emailForForgotPassword = action.payload;
    },
    emailSentDisable: (state) => {
      state.isEmailSent = false;
    },
    changeCheckoutInfo: (state, action: PayloadAction<ICheckout>) => {
      state.checkoutInfo = action.payload;
    },
    confirmUserDataLoaded: (state) => {
      state.userDataLoaded = true;
    },
    clearError: (state) => {
      state.error = null;
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
        state.userDataLoaded = false;
      })
      .addCase(userApi.refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.userDataLoaded = true;
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(userApi.refresh.rejected, (state) => {
        state.loading = false;
        state.userDataLoaded = true;
        localStorage.removeItem('token');
      })

      .addCase(userApi.forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.isEmailSent = true;
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

      .addCase(userApi.validateCheckoutInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.validateCheckoutInfo.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(userApi.changeUserName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.changeUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.accessToken);
      })

      .addCase(userApi.changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.changeUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.accessToken);
      })

      .addCase(userApi.deleteAcc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.deleteAcc.fulfilled, (state) => {
        state.loading = false;
        state.user = {} as IUser;
        localStorage.removeItem('token');
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
