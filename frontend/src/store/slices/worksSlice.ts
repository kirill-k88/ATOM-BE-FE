import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Ifilter, TWork } from '../../utils/types/types';
import { FormikHelpers } from 'formik';
import { format } from 'date-fns';

export const getWorks = createAsyncThunk<TWork[], [Ifilter, FormikHelpers<Ifilter> | null]>(
  'works/getWorks',
  async (arr, thunkAPI) => {
    const [filter, FormikHelpers] = arr;
    console.log(filter);
    thunkAPI.dispatch(worksActions.setFilter(filter));
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

export interface IworkSlice {
  isLoading: boolean;
  error: string | null;
  works: TWork[];
  filter: Ifilter;
}

const initialState: IworkSlice = {
  isLoading: false,
  error: null,
  works: [],
  filter: { period_start: '', period_end: '', object_name: '', work_type: '' }
};

export const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
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
