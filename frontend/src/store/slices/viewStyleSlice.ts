import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export enum EViewStyles {
  'list' = 'list',
  'grid' = 'grid'
}

export interface IviewStyleSlice {
  style: EViewStyles;
}

const initialState: IviewStyleSlice = {
  style: EViewStyles.list
};

export const viewStyleSlice = createSlice({
  name: 'viewStyle',
  initialState,
  reducers: {
    setStyle: (state, action: PayloadAction<IviewStyleSlice>) => {
      state.style = action.payload.style;
    }
  }
});

export const { setStyle } = viewStyleSlice.actions;

export const viewStyleReducer = viewStyleSlice.reducer;
