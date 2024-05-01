import { configureStore } from '@reduxjs/toolkit';
import { worksReducer } from './slices/worksSlice';

export const store = configureStore({
  reducer: {
    worksReducer: worksReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
