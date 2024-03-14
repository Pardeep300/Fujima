import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountInformation } from "../../api/endpoints";

export const fetchAccountInformation = createAsyncThunk(
  "userInfo/accountInfor",
  async (formData: any) => {
    try {
      const response = await getAccountInformation(formData);
      return response.data;
    } catch (err) {
      console.log(err, "error during getting the account info");
    }
  }
);
