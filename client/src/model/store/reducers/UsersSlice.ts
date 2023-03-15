import { IUser } from '../../types/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { usersService } from '../../services';

interface IUserState {
  users: IUser[];
  loading: boolean;
  error: string | null;
};

const initialState: IUserState = {
  users: [],
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersService().getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(usersService().getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addMatcher(usersService().error, (
        state, action: PayloadAction<string>
      ) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
