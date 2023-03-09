import { IUser } from '../../../types/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../../../services/UserService';

interface IUsersState {
  users: IUser[];
  loading: boolean;
  error: string | null;
};

const initialState: IUsersState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userApi().getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userApi().getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        console.log('🚀 ~ .addCase ~ action.payload:', action.payload);
        state.loading = false;
      })
      .addMatcher(userApi().error, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
