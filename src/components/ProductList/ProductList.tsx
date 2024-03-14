import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductData from "../productData/ProductData";
import { ProductListEnum } from "../../constants/Enum";
import theme from "../../config/theme";
import { useAppDispatch } from "../../redux/store";
import {
  addProductToCart,
  fetchCartProducts,
} from "../../redux/actions/addCart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const ProductList = ({
  data,
  title,
  loading,
}: {
  data: any;
  title?: any;
  loading?: any;
}) => {
  const productData =
    ProductListEnum.SEARCH_PRODUCT_LIST === title
      ? data?.ProductSearchList
      : data?.ProductList;
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    Products: [
      {
        ProductCode: "",
        Quantity: 1,
        UOMCode: "",
      },
    ],
    CustomerCode: "",
    LoginId: "",
    Type: "",
    ShoppingListId: "0",
  });
  const cartItem = useSelector((state: any) => state.user);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetail: any = await AsyncStorage.getItem("userInfo");
        const userDetails = JSON.parse(userDetail);
        setFormData((prevFormData) => ({
          ...prevFormData,
          CustomerCode: userDetails.authentication.response.CustomerCode,
          LoginId: userDetails.authentication.response.LoginId,
        }));
      } catch (error) {
        console.error("Error retrieving user details:", error);
      }
    };
    const timer = setTimeout(getUserDetails, 100);
    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      {productData && productData != null && productData != undefined ? (
        productData?.map((item: any, index: number) => {
          return (
            <View key={index}>
              <ProductData
                style={{
                  width: (Dimensions.get("window").width - 50) / 2,
                  maxWidth: 250,
                  overflow: "hidden",
                  paddingHorizontal: 10,
                  marginRight: 0,
                  marginTop: 0,
                }}
                productData={{ item }}
                smallButtonStyle={{ width: 110, paddingVertical: 8 }}
                arrow_size={18}
                index={index.toString() + item?.ProdCode}
                addToCart={async () => {
                  const updatedFormData = {
                    ...formData,
                    Products: [
                      {
                        ProductCode: item.ProdCode,
                        Quantity: 1,
                        UOMCode: item.DisplayUOM,
                      },
                    ],
                  };
                  setFormData(updatedFormData);
                  dispatch(
                    addProductToCart({
                      ...updatedFormData,
                      userInfo: cartItem?.userInfo,
                      dispatch,
                    })
                  );
                }}
              />
            </View>
          );
        })
      ) : (
        <View style={{ margin: 30, flex: 1 }}>
          <Text
            style={{
              color: "#883333",
              fontFamily: "Inter-Bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            No Result Found
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    // marginBottom: 30,
    gap: 10,
  },
  loadingContainer: {
    flex: 1,
    paddingTop: 100,
    height: Dimensions.get("screen").height,
  },
});

export default ProductList;
