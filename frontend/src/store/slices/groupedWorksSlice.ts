import axios, { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';
import { format } from 'date-fns';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Ifilter, IgroupForm, TGroupedWorks } from '../../utils/types/types';

export const getGroupedWorks = createAsyncThunk<
  TGroupedWorks[],
  [IgroupForm, Ifilter, FormikHelpers<IgroupForm>]
>('groupedWorks/getGroupedWorks', async (arr, thunkAPI) => {
  const [IgroupForm, filter, FormikHelpers] = arr;
  thunkAPI.dispatch(groupedWorksActions.setWithCommulative(IgroupForm));
  try {
    const response = await axios.get<TGroupedWorks[]>(`http://localhost:3000/works`, {
      params: {
        period_start: filter.period_start && format(new Date(filter.period_start), 'dd.MM.yyyy'),
        period_end: filter.period_end && format(new Date(filter.period_end), 'dd.MM.yyyy'),
        object_name: filter.object_name,
        work_type: filter.work_type,
        with_summary: true
      }
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return thunkAPI.rejectWithValue(err.response?.data ?? 'Ошибка загрузки данных');
  } finally {
    FormikHelpers?.setSubmitting(false);
  }
});

export interface IgroupedWorkSlice {
  isLoading: boolean;
  error: string | null;
  groupedWorks: TGroupedWorks[];
  withCommulative: boolean;
}

const initialState: IgroupedWorkSlice = {
  isLoading: false,
  error: null,
  groupedWorks: [],
  withCommulative: false
};

export const groupedWorksSlice = createSlice({
  name: 'groupedWorks',
  initialState,
  reducers: {
    setWithCommulative(state, action) {
      state.withCommulative = action.payload.withCommulative;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getGroupedWorks.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGroupedWorks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groupedWorks = action.payload.map(g => {
          return {
            ...g,
            total_fact_sum: +g.total_fact_sum,
            total_plan_sum: +g.total_plan_sum,
            cumulative_fact_sum: +g.cumulative_fact_sum,
            cumulative_plan_sum: +g.cumulative_plan_sum
          };
        });
      })
      .addCase(getGroupedWorks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const groupedWorksActions = groupedWorksSlice.actions;

export const groupedWorksReducer = groupedWorksSlice.reducer;
