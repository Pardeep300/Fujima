import { createSlice } from "@reduxjs/toolkit";
import { fecthSaveLaterProduct, fetchCartProducts } from "../actions/addCart";

const initialState = {
  cartProducts: null,
  saveLaterProducts: null,
  loading: false,
  error: null,
};
export const cartSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add reducer for the get cart prodcuts
      .addCase(fetchCartProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload;
        state.error = null;
      })
      .addCase(fetchCartProducts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // add reducer for the get Save later prodcuts
      .addCase(fecthSaveLaterProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fecthSaveLaterProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.saveLaterProducts = action.payload;
      })
      .addCase(fecthSaveLaterProduct.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
