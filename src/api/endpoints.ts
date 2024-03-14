import { API_BASE_URL } from "../config/extras";
import API from "./API";

export const savRequestLoginUser = (formData: any) => API.post("", formData);

export const saveRequestLoginUser = async (formData: any) => {
  try {
    const response = await fetch(
      API_BASE_URL + "Fujimausa/SaveRequestLoginUser",
      {
        method: "POST",
        body: formData,
        headers: {
          // Include any necessary headers here
          // Authorization header if required
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors here
    console.error("Error occurred during fetch:", error);
    throw error;
  }
};

export const getAddressValidation = (formData: any) =>
  API.post("Fujimausa/GetAddressValidationData", formData);

export const loginUser = (formData: any) =>
  API.post("Fujimausa/Login", formData);

export const forgotPassword = (formData: any) =>
  API.post("Fujimausa/CheckUserForForgetPassword", formData);

export const mostRequestProduct = (formData: any) =>
  API.post("Fujimausa/GetMostRequestedProducts", formData);

export const getAllProducts = (formData: any) =>
  API.post("Fujimausa/GetProducts", formData);

export const getClearanceProduct = (formData: any) =>
  API.post("Fujimausa/GetClearenceProducts", formData);

export const getHomeBrands = (formData: any) =>
  API.post("Fujimausa/GetManufacturers", formData);

export const getSearchData = (formdata: any) =>
  API.post("Fujimausa/GetSearchData", formdata);

export const getProductDetails = (formData: any) =>
  API.post("Fujimausa/GetProductDetail", formData);

export const getReleatedProducts = (formData: any) =>
  API.post("Fujimausa/GetReleatedProducts", formData);

export const getCategoriesAndSubCategories = (formData: any) =>
  API.post("Fujimausa/GetCategoriesAndSubCategories", formData);

export const getComparisonProducts = (formData: any) =>
  API.post("Fujimausa/CompareProducts", formData);

export const getProductByBrand = (formData: any) =>
  API.post("/Fujimausa/GetProducts", formData);

export const getCategoriesForShop = () =>
  API.get("Fujimausa/GetCategoriesAndLogo");

export const addToCart = (formData: any) =>
  API.post("Fujimausa/AddToCart", formData);

export const getCartProducts = (formData: any) =>
  API.post("Fujimausa/GetCartItems", formData);

export const saveForLater = (formData: any) =>
  API.post("Fujimausa/MoveItemToSaveLater", formData);

export const removeProduct = (formData: any) =>
  API.post("Fujimausa/DeleteCartOrSavedItem", formData);

export const getSaveLaterItemList = (formData: any) =>
  API.post("Fujimausa/GetSavedLaterItemList", formData);

export const deleteCartAndSavedItem = (formData: any) =>
  API.post("Fujimausa/DeleteCartOrSavedItem", formData);

  export const getAccountInformation = (formData:any) => 
  API.post("Fujimausa/GetAccountInformation",formData)
