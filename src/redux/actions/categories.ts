import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategoriesAndSubCategories,
  getCategoriesForShop,
} from "../../api/endpoints";

export const fetchCategories = createAsyncThunk(
  "allCategories/categories",
  async (formData: any) => {
    try {
      const response = await getCategoriesAndSubCategories(formData);
      return response.data.response;
    } catch (err: any) {
      console.log("Error occur during get Categoroies and SubCategories ");
    }
  }
);

export const fetchSubCategories1 = createAsyncThunk(
  "allCategories/subCategories1",
  async (formData: any) => {
    try {
      const response = await getCategoriesAndSubCategories(formData);
      return response.data.response;
    } catch (err: any) {
      console.log("Error occur during get Categoroies and SubCategories ");
    }
  }
);
export const fetchSubCategories2 = createAsyncThunk(
  "allCategories/subCategories2",
  async (formData: any) => {
    try {
      const response = await getCategoriesAndSubCategories(formData);
      return response.data.response;
    } catch (err: any) {
      console.log("Error occur during get Categoroies and SubCategories ");
    }
  }
);

export const fetchSubCategories3 = createAsyncThunk(
  "allCategories/subCategories3",
  async (formData: any) => {
    try {
      const response = await getCategoriesAndSubCategories(formData);
      return response.data.response;
    } catch (err: any) {
      console.log("Error occur during get Categoroies and SubCategories ");
    }
  }
);

export const fetchCategoriesForShop = createAsyncThunk(
  "allCategories/categoriesForShop",
  async () => {
    try {
      const response = await getCategoriesForShop();
      return response.data.response[0];
    } catch (err: any) {
      console.log("Error occur during get Categoroies for shop", err);
    }
  }
);
export const fetchSubCategoriesForShop = createAsyncThunk(
  "allCategories/subCategoriesForShop",
  async (formData: any) => {
    try {
      const response = await getCategoriesAndSubCategories(formData);
      return response.data.response;
    } catch (err: any) {
      console.log("Error occur during get Categoroies for shop", err);
    }
  }
);
export const fetchSub1CategoriesForShop = createAsyncThunk(
  "allCategories/sub1CategoriesForShop",
  async (formData: any) => {
    try {
      const response = await getCategoriesAndSubCategories(formData);
      return response.data.response;
    } catch (err: any) {
      console.log("Error occur during get Categoroies for shop", err);
    }
  }
);
