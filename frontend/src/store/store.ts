import { configureStore } from '@reduxjs/toolkit';
import { worksReducer } from './slices/worksSlice';
import { groupedWorksReducer } from './slices/groupedWorksSlice';

export const store = configureStore({
  reducer: {
    worksReducer: worksReducer,
    groupedWorksReducer: groupedWorksReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
