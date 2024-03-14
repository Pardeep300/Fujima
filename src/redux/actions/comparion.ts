import { createAsyncThunk } from "@reduxjs/toolkit";
import { getComparisonProducts } from "../../api/endpoints";

export const fetchComparedProduct = createAsyncThunk(
  "comparison/products",
  async (formData: any) => {
    try {
      const response = await getComparisonProducts(formData);
      return response.data.response[0];
    } catch (err: any) {
      console.log(err, "error during the comparison products");
    }
  }
);
