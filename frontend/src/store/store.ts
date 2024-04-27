import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './slices/filterSlice';
import { viewStyleReducer } from './slices/viewStyleSlice';

export const store = configureStore({
  reducer: {
    filterReducer: filterReducer,
    viewStyleReducer: viewStyleReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
