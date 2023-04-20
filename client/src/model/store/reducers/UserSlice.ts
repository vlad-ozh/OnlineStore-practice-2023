import { IUser } from '../../types/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../../apis';

interface IUserState {
  users: IUser[];
  user: IUser;
  loading: boolean;
  error: string | null;
};

const initialState: IUserState = {
  users: [],
  user: {} as IUser,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userApi.getAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi.getAll.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
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
      .addMatcher(userApi.error, (
        state, action: PayloadAction<any>
      ) => {
        const errorMsg = action.payload?.response.data.message;
        const error = errorMsg ? errorMsg : null;
        state.error = error;
        state.loading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
