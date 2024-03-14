import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  mostRequestProduct,
  getClearanceProduct,
  getProductDetails,
  getReleatedProducts,
  getAllProducts,
} from "../../api/endpoints";
interface MostRequestedProps {
  Email: string;
  seeAll?: boolean;
}

export const mostRequestProductforHome = createAsyncThunk(
  "product/mostRequested",
  async (formData: MostRequestedProps) => {
    try {
      const payload = formData.seeAll
        ? {
            Category: "",
            SubCat1: "",
            SubCat2: "",
            SubCat3: "",
            PageNumber: 1,
            Brand: "",
            PageSize: 48,
            OrderBy: "Price",
            OrderDirection: "ASC",
            isStockChecked: false,
            SearchText: "",
            IsNewArrival: "",
            MaxPrice: 0,
            MinPrice: 0,
            ProdCodes: 0,
            Type: "",
            ...formData,
          }
        : {
            Category: "",
            SubCat1: "",
            SubCat2: "",
            SubCat3: "",
            PageNumber: 1,
            PageSize: 48,
            OrderBy: "Price",
            OrderDirection: "ASC",
            isStockChecked: false,
            SearchText: "",
            ...formData,
          };
      const response = await mostRequestProduct(payload);
      return response.data.response[0];
    } catch (error: any) {
      console.log("eerrrrrr", error);
      return error;
    }
  }
);

export const getClearanceProductForHome = createAsyncThunk(
  "product/clearance",
  async (formData: { Email: string }) => {
    try {
      const payload = {
        Category: "CLEARANCE",
        SubCat1: "",
        SubCat2: "",
        SubCat3: "",
        PageSize: 48,
        OrderBy: "Price",
        PageNumber: 1,
        OrderDirection: "ASC",
        MinPrice: 0,
        MaxPrice: 0,
        isStockChecked: false,
        SearchText: "",
        ...formData,
      };
      const response = await getClearanceProduct(payload);
      return response.data.response[0];
    } catch (error: any) {
      console.log("eerrrrrr", error);
      return error;
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "product/productDetails",
  async (formData: any) => {
    try {
      const response = await getProductDetails(formData);
      return response.data.response[0];
    } catch (error: any) {
      console.log("eerrrrrr", error);
      return error;
    }
  }
);

export const fetchReleatedProducts = createAsyncThunk(
  "product/releatedProducts",
  async (formData: any) => {
    try {
      const response = await getReleatedProducts(formData);
      return response.data.response[0];
    } catch (error: any) {
      console.log("eerrrrrr", error);
      return error;
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (formData: any) => {
    try {
      const response = await getAllProducts(formData);
      return response.data.response[0];
    } catch (error: any) {
      console.log("eerrrrrr", error);
      return error;
    }
  }
);
export const fetchProductsByBrand = createAsyncThunk(
  "product/fetchProductsByBrand",
  async (formData: any) => {
    try {
      const payload = {
        Category: "",
        SubCat1: "",
        SubCat2: "",
        SubCat3: "",
        PageSize: 48,
        OrderBy: "Price",
        Brand:"",
        PageNumber: 1,
        OrderDirection: "ASC",
        MinPrice: 0,
        MaxPrice: 0,
        isStockChecked: false,
        SearchText: "",
        ...formData,
      };
      const response = await getAllProducts(payload);
      return response.data.response[0];
    } catch (error: any) {
      console.log("eerrrrrr", error);
      return error;
    }
  }
);

