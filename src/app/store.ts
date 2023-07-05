/* eslint-disable max-len */
import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import productsReducer from '../features/products/productsSlice';
import mainReducer from '../features/main/mainSlice';
import usersReducer from '../features/users/usersSlice';
import { productsAPI } from '../api/services/TEST_RTKq';

const store = configureStore({
  reducer: {
    products: productsReducer,
    main: mainReducer,
    users: usersReducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = (dispatch: AppDispatch, getState: RootState) => void;
export type AppThunkAction
  = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
