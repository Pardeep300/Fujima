import { createSlice } from "@reduxjs/toolkit";
import { getSearchProductforHome } from "../actions/search";

const initialState = {
  searchProduct: null,
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchProductforHome.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getSearchProductforHome.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProduct = action.payload;
      })
      .addCase(getSearchProductforHome.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
