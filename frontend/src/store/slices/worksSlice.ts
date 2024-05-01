import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TWork } from '../../utils/types/types';

interface Ifilter {
  period_start_in: string;
  period_end_in: string;
  object_name_in: string;
  work_type_in: string;
}

export const getWorks = createAsyncThunk<TWork[], Ifilter>(
  'works/getWorks',
  async (filter, thunkAPI) => {
    try {
      const response = await axios.get<TWork[]>(`http://localhost:3000/works`, {
        params: {
          period_start_in: filter.period_start_in,
          period_end_in: filter.period_end_in,
          object_name_in: filter.object_name_in,
          work_type_in: filter.work_type_in
        }
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data ?? 'Ошибка загрузки данных');
    }
  }
);

export interface IFilterSlice {
  isLoading: boolean;
  error: string | null;
  works: TWork[];
}

const initialState: IFilterSlice = {
  isLoading: false,
  error: null,
  works: []
};

export const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWorks.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWorks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.works = action.payload;
      })
      .addCase(getWorks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const worksActions = worksSlice.actions;

export const worksReducer = worksSlice.reducer;
