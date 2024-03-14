import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "../components/Layout";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Text } from "react-native-paper";
import SmallButton from "../elements/SmallButton";
import CartDetailsCard from "../components/CartDetailsCard/CartDetailsCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../redux/store";
import {
  addProductToCart,
  addToSaveLater,
  deleteAll,
  fecthSaveLaterProduct,
  fetchCartProducts,
  removeProuductFromCart,
} from "../redux/actions/addCart";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import ShimmerCartDetails from "../components/ShimmerPlaceholder/ShimmerCartDetails";
import SaveLaterItemDetails from "../components/CartDetailsCard/SaveLaterItemDetails";
import { getSearchProductforHome } from "../redux/actions/search";
import theme from "../config/theme";

const CartScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    PageNumber: 1,
    SearchText: "",
    PageSize: 10,
    OrderBy: "",
    OrderDirection: "",
    Type: "Cart",
    Email: "",
    Category: "",
    SubCat1: "",
    SubCat2: "",
    SubCat3: "",
    IsNewArrival: 0,
  });
  const [getSaveLater, setGetSaveLater] = useState({
    SearchText: "",
    PageSize: 48,
    OrderBy: "Price",
    PageNumber: 1,
    OrderDirection: "ASC",
    CustomerCode: "",
    LoginId: "",
  });
  const [addCart, setAddCart] = useState({
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
  const [removeAll, setRemoveAll] = useState({
    Products: [],
    CustomerCode: "",
    LoginId: "",
    Type: "ClearCart",
    message: "",
    currentIndex: 0,
  });
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(true);
  const {
    cartProducts: cartProducts,
    loading,
    saveLaterProducts: saveLaterProducts,
  } = useSelector((state: any) => state.cartProducts);
  const cartItem = useSelector((state: any) => state.user);
  const removeCartProduct = (formData: any) => {
    dispatch(
      removeProuductFromCart({
        ...formData,
        userInfo: cartItem?.userInfo,
        getSaveLater: getSaveLater,
        dispatch,
      })
    );
  };
  const saveCartProduct = (formData: any) => {
    dispatch(
      addToSaveLater({
        ...formData,
        userInfo: cartItem?.userInfo,
        getSaveLater: getSaveLater,
        dispatch,
      })
    );
  };
  const removeAllFromCartAndSave = (formData: any) => {
    dispatch(
      deleteAll({
        ...formData,
        userInfo: cartItem?.userInfo,
        getSaveLater: getSaveLater,
        dispatch,
      })
    );
  };

  const moveToCart = (formData: any) => {
    dispatch(
      addProductToCart({
        ...formData,
        userInfo: cartItem?.userInfo,
        getSaveLater: getSaveLater,
        dispatch,
      })
    );
  };
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
        setGetSaveLater((prevFormData) => ({
          ...prevFormData,
          CustomerCode: userDetails.authentication.response.CustomerCode,
          LoginId: userDetails.authentication.response.LoginId,
        }));
        setAddCart((prevFormData) => ({
          ...prevFormData,
          CustomerCode: userDetails.authentication.response.CustomerCode,
          LoginId: userDetails.authentication.response.LoginId,
        }));
        setRemoveAll((prevFormData) => ({
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
  useEffect(() => {
    dispatch(fetchCartProducts(cartItem?.userInfo));
    dispatch(fecthSaveLaterProduct(getSaveLater));
  }, [isFocus]);
  const seachSuggestion = async (updatedSearchText: any) => {
    await dispatch(getSearchProductforHome(updatedSearchText));
  };
  const { searchProduct: searchProducts } = useSelector(
    (state: any) => state?.searchSuggestionProduct
  );

  return (
    <Layout>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={35} color="#e3d0d0" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: "#e3d0d0", fontWeight: "700" }}>
            Shopping Cart {`(${cartProducts?.CartItems?.length})`}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => removeAllFromCartAndSave(removeAll)}>
            <Text style={styles.removeAll}>Remove All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.headerContainer}>
          <View style={{ position: "relative", width: "75%" }}>
            <TextInput
              style={styles.input}
              value={formData.SearchText}
              onChangeText={(value) => {
                const updatedSearchText = {
                  ...formData,
                  SearchText: value,
                };
                setShow(true);
                setFormData(updatedSearchText);
                seachSuggestion(updatedSearchText);
              }}
              placeholder="Type product code"
              placeholderTextColor={"#909090"}
            ></TextInput>
          </View>
          <View style={{ width: "25%", marginLeft: 5 }}>
            <SmallButton
              title={"Add to Cart"}
              onPress={() => {
                if (formData.SearchText.trim() !== "") {
                  moveToCart(addCart);
                  setFormData({ ...formData, SearchText: "" });
                }
              }}
              textStyle={{
                color: "white",
                fontSize: 15,
                fontFamily: "Inter-Bold",
              }}
              style={{ marginVertical: 0, width: 100, borderRadius: 50 }}
            />
          </View>
          {formData.SearchText.trim() !== "" &&
            show &&
            searchProducts?.ProductSearchList &&
            searchProducts?.ProductSearchList?.length && (
              <View
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  left: 0,
                  right: 0,
                  marginHorizontal: 20,
                  borderRadius: 5,
                  height: 250,
                  top: 80,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.36,
                  shadowRadius: 6.68,
                  elevation: 11,
                }}
              >
                <FlatList
                  data={searchProducts?.ProductSearchList}
                  renderItem={(item) => (
                    <ScrollView>
                      <TouchableOpacity
                        onPress={() => {
                          setFormData({
                            ...formData,
                            SearchText: item.item.Description,
                          });
                          const updatedFormData = {
                            ...addCart,
                            Products: [
                              {
                                ProductCode: item.item.ProdCode,
                                Quantity: 1,
                                UOMCode: item.item.DisplayUOM,
                              },
                            ],
                          };
                          setAddCart(updatedFormData);
                          setShow(false);
                        }}
                      >
                        <View style={styles.searchSuggestion}>
                          <Text style={styles.description}>
                            {item.item.Description} {`(${item.item.ProdCode})`}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </ScrollView>
                  )}
                />
              </View>
            )}
        </View>
        {cartProducts?.CartItems?.length ? (
          loading ? (
            <ShimmerCartDetails />
          ) : (
            <CartDetailsCard
              cartProducts={cartProducts}
              cartItem={cartItem}
              removeCartProduct={removeCartProduct}
              saveCartProduct={saveCartProduct}
              getSaveLater={getSaveLater}
              moveToCart={moveToCart}
              setShow={setShow}
            />
          )
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              flex: 1,
              flexDirection: "row",
              marginVertical:20
            }}
          >
            <Text style={{ color: "#883333", fontWeight: "700", fontSize: 20 }}>
              No Product Found
            </Text>
          </View>
        )}

        {saveLaterProducts?.SavedItemsList?.length && (
          <View>
            <View style={{ marginBottom: 10, marginLeft: 10 }}>
              <Text
                style={{ fontSize: 17, fontWeight: "700", color: "#000000" }}
              >
                Saved For Later({saveLaterProducts?.SavedItemsList?.length})
              </Text>
            </View>
            {loading ? (
              <ShimmerCartDetails />
            ) : (
              <SaveLaterItemDetails
                saveLaterProducts={saveLaterProducts}
                cartItem={cartItem}
                removeCartProduct={removeCartProduct}
                moveToCart={moveToCart}
                setShow={setShow}
              ></SaveLaterItemDetails>
            )}
          </View>
        )}
      </ScrollView>
      <View style={{ backgroundColor: "#ebebeb" }}>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 15,
            paddingHorizontal: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.5,
            shadowRadius: 12.35,
            elevation: 19,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          }}
        >
          <View>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#494949" }}>
              Sub Total
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#000" }}>
              ${cartProducts?.TotalAmount ? cartProducts?.TotalAmount : 0}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#47BD1E",
              paddingHorizontal: 30,
              paddingVertical: 15,
              borderRadius: 50,
            }}
          >
            <TouchableOpacity>
              <Text style={{ fontSize: 14, fontWeight: "700", color: "white" }}>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#CCCCCC",
          paddingHorizontal: 20,
        }}
      ></View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  removeAll: { color: "white", fontSize: 14, fontWeight: "600" },
  scrollViewContainer: { flex: 1, backgroundColor: "#ebebeb" },
  input: {
    height: 55,
    paddingLeft: 15,
    paddingRight: 10,
    fontSize: 18,
    color: "#909090",
    fontFamily: "Inter-Medium",
    width: "100%",
    borderRadius: 50,
    backgroundColor: "white",
  },
  headerContainer: {
    backgroundColor: "#F9EEEE",
    padding: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "relative",
    elevation: 5,
    zIndex: 999999,
  },
  searchSuggestion: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.borderGray,
  },
  description: {
    color: "#000000",
    fontWeight: "600",
    paddingVertical: 10,
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 10,
  },
});

export default CartScreen;
