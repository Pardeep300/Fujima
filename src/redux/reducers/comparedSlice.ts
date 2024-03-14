import { createSlice } from "@reduxjs/toolkit";
import { fetchComparedProduct } from "../actions/comparion";

const initialState = {
  comparedItem: null,
  comparisonProduct: null,
  loading: false,
  error: null,
};

export const comparedItemsSlice = createSlice({
  name: "comparedItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      return { ...state, comparedItem: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch comparison response
      .addCase(fetchComparedProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchComparedProduct.fulfilled, (state: any, action) => {
        state.loading = false;
        state.comparisonProduct = action.payload;
      })
      .addCase(fetchComparedProduct.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addItem } = comparedItemsSlice.actions;

export default comparedItemsSlice.reducer;
