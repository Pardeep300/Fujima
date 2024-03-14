import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartAndSavedItem,
  getCartProducts,
  getSaveLaterItemList,
  removeProduct,
  saveForLater,
} from "../../api/endpoints";
import { showMessage } from "react-native-flash-message";

export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProduct",
  async (formData: any) => {
    try {
      const response = await getCartProducts(formData);
      return response.data.response[0];
    } catch (err: any) {
      console.log("error during the get cart products", err);
      return err.response.data;
    }
  }
);
export const fecthSaveLaterProduct = createAsyncThunk(
  "cart/fetchSaveLaterProduct",
  async (formData: any) => {
    try {
      const response = await getSaveLaterItemList(formData);
      return response.data.response[0];
    } catch (err) {
      console.log("error during fetching the save later product", err);
    }
  }
);
export const addProductToCart = createAsyncThunk(
  "cart/addToCart",
  async (formData: any) => {
    try {
      const { userInfo, dispatch, getSaveLater, ...rest } = formData;
      const response = await addToCart(rest);
      dispatch(fetchCartProducts(userInfo));
      dispatch(fecthSaveLaterProduct(getSaveLater));
      if (response.data.message) {
        showMessage({
          message: response.data.message,
          titleStyle: {
            fontFamily: "Inter-SemiBold",
            fontSize: 16,
            color: "white",
          },
          floating: true,
          duration: 4000,
          style: {
            backgroundColor: "#883333",
            width: "90%",
            padding: 25,
            borderRadius: 10,
            alignSelf: "center",
          },
        });
      } else if (response.data.error) {
        showMessage({
          message: `${response.data.error}. Only 1 can be added`,
          titleStyle: {
            fontFamily: "Inter-SemiBold",
            fontSize: 16,
            color: "white",
          },
          floating: true,
          duration: 4000,
          style: {
            backgroundColor: "#883333",
            width: "90%",
            padding: 25,
            borderRadius: 10,
            alignSelf: "center",
          },
        });
      }

      return response.data;
    } catch (err: any) {
      console.log("error during the add product to cart", err);
      return err.response.data;
    }
  }
);

export const addToSaveLater = createAsyncThunk(
  "cart/addToSaveLater",
  async (formData: any) => {
    try {
      const { userInfo, dispatch, getSaveLater, ...rest } = formData;
      const response = await saveForLater(rest);
      dispatch(fetchCartProducts(userInfo));
      dispatch(fecthSaveLaterProduct(getSaveLater));
      return response.data;
    } catch (err) {
      console.log(err, "Error during the add to save later");
    }
  }
);

export const removeProuductFromCart = createAsyncThunk(
  "cart/removeCart",
  async (formData: any) => {
    try {
      const { userInfo, dispatch, getSaveLater, ...rest } = formData;
      const response = await removeProduct(rest);
      dispatch(fetchCartProducts(userInfo));
      dispatch(fecthSaveLaterProduct(getSaveLater));
      return response.data;
    } catch (err: any) {
      console.log(err, "error during the cart remove");
    }
  }
);

export const deleteAll = createAsyncThunk(
  "cart/removeAllCart",
  async (formData: any) => {
    try {
      const { userInfo, dispatch, getSaveLater, ...rest } = formData;
      console.log(rest, "kjnsdk");
      const response = await deleteCartAndSavedItem(rest);
      dispatch(fetchCartProducts(userInfo));
      dispatch(fecthSaveLaterProduct(getSaveLater));
      if (response.data.message) {
        showMessage({
          message: response.data.message,
          titleStyle: {
            fontFamily: "Inter-SemiBold",
            fontSize: 16,
            color: "white",
          },
          floating: true,
          duration: 4000,
          style: {
            backgroundColor: "#883333",
            width: "90%",
            padding: 25,
            borderRadius: 10,
            alignSelf: "center",
          },
        });
      }
      return response.data;
    } catch (err) {
      console.log(err, "error during the remove all cart");
    }
  }
);
