import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis/index';

export const getNewProducts = createAsyncThunk(
  'app/newProducts',
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProducts({ sort: '-createdAt' });

    if (!response.success) return rejectWithValue(response);

    return response.productDatas;
  }
);
