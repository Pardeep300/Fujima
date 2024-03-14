import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchCategoriesForShop,
  fetchSub1CategoriesForShop,
  fetchSubCategories1,
  fetchSubCategories2,
  fetchSubCategories3,
  fetchSubCategoriesForShop,
} from "../actions/categories";

const initialState = {
  categories: null,
  subCategories1: null,
  subCategories2: null,
  subCategories3: null,
  shopCategories: null,
  shopSubCategories: null,
  shopSub1Categories:null,
  loading: false,
  error: null,
};
export const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch Sub Categories 1
      .addCase(fetchSubCategories1.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories1.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.subCategories1 = action.payload;
      })
      .addCase(fetchSubCategories1.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch Sub Categories 2
      .addCase(fetchSubCategories2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories2.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.subCategories2 = action.payload;
      })
      .addCase(fetchSubCategories2.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fecth Sub Categories 3
      .addCase(fetchSubCategories3.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories3.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.subCategories3 = action.payload;
      })
      .addCase(fetchSubCategories3.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch categories for shop
      .addCase(fetchCategoriesForShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesForShop.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.shopCategories = action.payload;
      })
      .addCase(fetchCategoriesForShop.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch Sub-Categories for shop
      .addCase(fetchSubCategoriesForShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategoriesForShop.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.shopSubCategories = action.payload;
      })
      .addCase(fetchSubCategoriesForShop.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fecth Sub-Categories1 for shop
      .addCase(fetchSub1CategoriesForShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSub1CategoriesForShop.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.shopSub1Categories = action.payload;
      })
      .addCase(fetchSub1CategoriesForShop.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default categoriesSlice.reducer;
