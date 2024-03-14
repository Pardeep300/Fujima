import { createSlice } from "@reduxjs/toolkit";
import { fetchAccountInformation } from "../actions/accountInfo";

const initialState = {
  accountInfo: null,
  loading: false,
  error: null,
};
export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add reducer for the get cart prodcuts
      .addCase(fetchAccountInformation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.accountInfo = action.payload;
        state.error = null;
      })
      .addCase(fetchAccountInformation.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userInfoSlice.reducer;
