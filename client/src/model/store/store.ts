import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { usersReducer, productsReducer } from './reducers';

const rootReducer = combineReducers({
  usersReducer,
  productsReducer,
});

export const Store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof Store>;
export type AppDispatch = AppStore['dispatch'];
