import { createSlice } from "@reduxjs/toolkit";
import { getHomeBrand } from "../actions/banner";

const initialState = {
  homeBrands: null,
  loading: false,
  error: null,
};

export const bannerSlice = createSlice({
  name: "bannerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomeBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.homeBrands = action.payload;
      })
      .addCase(getHomeBrand.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bannerSlice.reducer;