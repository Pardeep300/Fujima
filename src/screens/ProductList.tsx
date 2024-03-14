import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Layout from "../components/Layout";
import Header from "../elements/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../redux/store";
import {
  fetchAllProducts,
  getClearanceProductForHome,
  mostRequestProductforHome,
  fetchProductsByBrand
} from "../redux/actions/product";
import ProductList from "../components/ProductList/ProductList";
import { ProductListEnum } from "../constants/Enum";
import { useSelector } from "react-redux";
import FilterBar from "../components/ProductList/FilterBar";
import { getSearchProductforHome } from "../redux/actions/search";
import { ContinousBaseGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gesture";
import { All_PRODUCTS } from "../constants/HomeScreen";
import { BRAND_PRODUCTS } from "../constants/HomeScreen";
import ComparisonButton from "../components/ComapareButton/CompareButton";
import { useIsFocused } from "@react-navigation/native";
const ProductScreen = ({ route,brandName }: any) => {
  const isFocused=useIsFocused()
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const {
    mostRequestedProduct: productData,
    allProducts: allProducts,
    loading,
  } = useSelector((state: any) => state?.products);

  const { searchProduct: searchProducts, loading: searchLoading } = useSelector(
    (state: any) => state?.searchSuggestionProduct
  );
  
  const initialize = async (listType: string) => {
    const res: any = await AsyncStorage.getItem("userInfo");
    const data = JSON.parse(res);
   
    if (ProductListEnum.CLEARANCE === listType)
      await dispatch(
        fetchAllProducts({
          ...All_PRODUCTS,
          Email: data.authentication.response.Email,
        })
      );
      else if (ProductListEnum.BRAND === listType) { 
        await dispatch(
          fetchProductsByBrand({
            ...BRAND_PRODUCTS,
            Brand: route.params.brandName,
            Email: data.authentication.response.Email,
          })
        );
      }
    else if (ProductListEnum.MOST_REQUESTED === listType)
      await dispatch(
        mostRequestProductforHome({
          Email: data.authentication.response.Email,
          seeAll: true,
        })
      );
    else if (ProductListEnum.SEARCH_PRODUCT_LIST === listType) {
      await dispatch(getSearchProductforHome(route?.params?.searchText));
    } else if (ProductListEnum.ADVANCED_SEARCH === listType) {
      await dispatch(fetchAllProducts(route.params.formData));
    }
  };
  const { comparedItem: comparedItem } = useSelector(
    (state: any) => state.comparedItems
  );
  const parseItem = JSON.parse(comparedItem);
  useEffect(() => {
    if (route.params?.title) {
      setTitle(route.params.title);
      initialize(route.params.title);
    }
  }, [route.params,isFocused]);
  return (
    <Layout>
      <Header title={title} searchText={route.params?.searchText?.SearchText} />
      <FilterBar listType={title} />
      <ScrollView style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
        <View
          style={{
            backgroundColor: "#f4f4f4",
            height: "100%",
            paddingVertical: 20,
          }}
        >
          <ProductList
            data={
              ProductListEnum.CLEARANCE === title
                ? allProducts
                : ProductListEnum.MOST_REQUESTED === title
                ? productData
                : ProductListEnum.SEARCH_PRODUCT_LIST === title
                ? searchProducts
                : ProductListEnum.ADVANCED_SEARCH === title
                ? allProducts
                :ProductListEnum.BRAND === title
                ?allProducts
                : {}
            }
            title={title}
            loading={loading}
          />
        </View>
      </ScrollView>
      {parseItem?.length > 0 ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 999,
          }}
        >
          <ComparisonButton />
        </View>
      ) : null}
    </Layout>
  );
};
export default ProductScreen;
