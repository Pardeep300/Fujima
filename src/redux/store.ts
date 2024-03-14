import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authSlice } from "./reducers/authSlice";
import { productSlice } from "./reducers/productSlice";
import { bannerSlice } from "./reducers/bannerSlice";
import { searchSlice } from "./reducers/searchSlice";
import { categoriesSlice } from "./reducers/categoriesSlice";
import { comparedItemsSlice } from "./reducers/comparedSlice";
import { cartSlice } from "./reducers/cartSlice";
import { userInfoSlice } from "./reducers/userInfoSlice";

export const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    products: productSlice.reducer,
    banners: bannerSlice.reducer,
    searchSuggestionProduct: searchSlice.reducer,
    allCategories: categoriesSlice.reducer,
    comparedItems: comparedItemsSlice.reducer,
    cartProducts: cartSlice.reducer,
    userInfo:userInfoSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
