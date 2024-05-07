import axios, { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TFile } from '../../utils/types/types';
import { BASEPATH } from '../../utils/constants/constants';

export const postWorks = createAsyncThunk<boolean, [TFile, FormikHelpers<{ file: TFile }>]>(
  'worksFile/postWorks',
  async (arr, thunkAPI) => {
    const [file, FormikHelpers] = arr;
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file, file.name);

        await axios.post<TFile>(`${BASEPATH}works`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return true;
      } catch (error) {
        const err = error as AxiosError;
        return thunkAPI.rejectWithValue(err.response?.data ?? 'Ошибка загрузки данных');
      } finally {
        FormikHelpers?.setSubmitting(false);
      }
    }
    return false;
  }
);

export interface IworkSlice {
  isLoading: boolean;
  error: string | null;
  isSucceed: boolean;
}

const initialState: IworkSlice = {
  isLoading: false,
  error: null,
  isSucceed: false
};

export const worksFileSlice = createSlice({
  name: 'worksFile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postWorks.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postWorks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucceed = action.payload;
      })
      .addCase(postWorks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const worksFileActions = worksFileSlice.actions;

export const worksFileReducer = worksFileSlice.reducer;
