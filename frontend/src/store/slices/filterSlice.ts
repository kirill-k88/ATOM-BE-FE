import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { IFilter } from '../../utils/types/types';
export interface IFilterSlice {
  filter: IFilter;
}

const initialState: IFilterSlice = {
  filter: {
    from: '',
    to: '',
    loadingDate: '',
    act: ''
  }
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<IFilterSlice>) => {
      state.filter = action.payload.filter;
    },
    resetFilter: state => {
      state.filter = initialState.filter;
    }
  }
});

export const { setFilter, resetFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
