import { createAsyncThunk } from "@reduxjs/toolkit";
import { getHomeBrands } from "../../api/endpoints";

export const getHomeBrand = createAsyncThunk(
  "banner/brands",
  async () => {
    try {
      const brands = {
        PageSize: 48,
        OrderBy: "Description",
        PageNumber: 1,
        OrderDirection: "ASC",
        Brand: "",
      };
      const response = await getHomeBrands(brands);
      return response.data.response[0];
    } catch (error: any) {
      console.log("error ouccer in getHomeBrand", error);
      return error;
    }
  }
);
