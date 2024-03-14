import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserInfo,
  signInUser,
  signUpUser,
  userForgotPassword,
  validateAddress,
} from "../actions/auth";

const initialState = {
  user: null,
  loading: false,
  error: null,
  forgotPasswordUser:null,
  addressValidationResult: null,
  userInfo:null
};

export const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add reducers for signUp users action
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add reducers for address validation action
      .addCase(validateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressValidationResult = action.payload;
        state.error = null;
      })
      .addCase(validateAddress.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      //  add reducers for login user action
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // add reducers for forgot password
      .addCase(userForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userForgotPassword.fulfilled, (state, action: any) => {
        state.loading = false;
        state.forgotPasswordUser = action.payload;
        state.error = null;
      })
      .addCase(userForgotPassword.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get the userDetails
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action: any) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(fetchUserInfo.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
