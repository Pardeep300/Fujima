import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSearchData } from "../../api/endpoints";

export const getSearchProductforHome = createAsyncThunk(
  "search/searchHomeProduct",
  async (formData: any) => {
    try {
      const response = await getSearchData(formData);
      return response.data.response[0];
    } catch (error: any) {
      console.log("errorror", error);
      return error;
    }
  }
);
