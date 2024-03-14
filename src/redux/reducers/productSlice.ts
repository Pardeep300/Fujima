import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductDetails,
  fetchReleatedProducts,
  getClearanceProductForHome,
  mostRequestProductforHome,
  fetchProductsByBrand
} from "../actions/product";

const initialState = {
  mostRequestedProduct: null,
  clearanceProduct: null,
  productDetails: null,
  releatedProduct: null,
  allProducts: null,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Most Requested Product
      .addCase(mostRequestProductforHome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mostRequestProductforHome.fulfilled, (state, action) => {
        state.loading = false;
        state.mostRequestedProduct = action.payload;
      })
      .addCase(mostRequestProductforHome.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Clearance Product
      .addCase(getClearanceProductForHome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClearanceProductForHome.fulfilled, (state, action: any) => {
        state.loading = false;
        state.clearanceProduct = action.payload;
      })
      .addCase(getClearanceProductForHome.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Releated Products
      .addCase(fetchReleatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReleatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.releatedProduct = action.payload;
      })
      .addCase(fetchReleatedProducts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // All Products
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // for geting product by brand 
      .addCase(fetchProductsByBrand.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchProductsByBrand.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
