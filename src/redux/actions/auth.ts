import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  forgotPassword,
  getAddressValidation,
  loginUser,
  saveRequestLoginUser,
} from "../../api/endpoints";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (formData: any) => {
    try {
      const response = await saveRequestLoginUser(formData);
      return response;
    } catch (error: any) {
      console.log("errerrerrerr", error);
      return error.response.data;
    }
  }
);
export const validateAddress = createAsyncThunk(
  "address/validateAddress",
  async (formData: any) => {
    try {
      const response = await getAddressValidation(formData);
      console.log("Address validation response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error occurred during address validation:", error);
      throw error;
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/loginUser",
  async (formData: any) => {
    try {
      const response = await loginUser(formData);
      console.log("Login User response", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Error occurred during sign In user");
      throw error;
    }
  }
);

export const userForgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (formData: any) => {
    try {
      const response = await forgotPassword(formData);
      console.log("Forgot Password response", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Error occurred during sign In user");
      throw error;
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async () => {
    try {
      const getUserDetails = async () => {
        const cartItem = {
          SearchText: "",
          PageSize: 48,
          OrderBy: "Price",
          PageNumber: 1,
          OrderDirection: "ASC",
          CustomerCode: "",
          LoginId: "",
        };
        try {
          const userDetail:any = await AsyncStorage.getItem("userInfo");
          const userDetails = JSON.parse(userDetail);
          cartItem.CustomerCode =
            userDetails.authentication.response.CustomerCode;
          cartItem.LoginId = userDetails.authentication.response.LoginId;
          return cartItem;
        } catch (error) {
          console.error("Error retrieving user details:", error);
          throw error;
        }
      };

      return getUserDetails(); // return the result of getUserDetails
    } catch (error) {
      console.log("Error occurred during sign In user");
      throw error;
    }
  }
);

