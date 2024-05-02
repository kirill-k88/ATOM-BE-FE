import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TWork } from '../../utils/types/types';
import { FormikHelpers } from 'formik';
import { format } from 'date-fns';

export interface Ifilter {
  period_start: string;
  period_end: string;
  object_name: string;
  work_type: string;
}

export const getWorks = createAsyncThunk<TWork[], [Ifilter, FormikHelpers<Ifilter>]>(
  'works/getWorks',
  async (arr, thunkAPI) => {
    const [filter, FormikHelpers] = arr;
    console.log(filter);
    try {
      const response = await axios.get<TWork[]>(`http://localhost:3000/works`, {
        params: {
          period_start: filter.period_start && format(new Date(filter.period_start), 'dd.MM.yyyy'),
          period_end: filter.period_end && format(new Date(filter.period_end), 'dd.MM.yyyy'),
          object_name: filter.object_name,
          work_type: filter.work_type
        }
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data ?? 'Ошибка загрузки данных');
    } finally {
      FormikHelpers?.setSubmitting(false);
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
