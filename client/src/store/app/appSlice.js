import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './asyncAction';

export const appSlice = createSlice({
  name: 'app',

  initialState: {
    categories: null,
    isLoading: false,
    errorMessage: '',
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

// export const {} = appSlice.actions;

export default appSlice.reducer;
