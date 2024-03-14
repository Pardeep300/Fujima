import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "../components/Layout";
import SearchBar from "../elements/SearchBar";
import { SEARCH_TEXT } from "../constants/HomeScreen";
import { getSearchProductforHome } from "../redux/actions/search";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ProductListEnum } from "../constants/Enum";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import theme from "../config/theme";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import CommonTextInput from "../elements/CommonTextInput";
import SmallButton from "../elements/SmallButton";
import { Dropdown } from "react-native-element-dropdown";
import {
  fetchCategories,
  fetchSubCategories1,
  fetchSubCategories2,
  fetchSubCategories3,
} from "../redux/actions/categories";

const GlobalSearchScreen = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const [searchText, setSearchText] = useState(SEARCH_TEXT);
  const seachSuggestion = async (updatedSearchText: any) => {
    await dispatch(getSearchProductforHome(updatedSearchText));
  };
  const [isFocusCat, setIsFocusCat] = useState(false);
  const [isFocusSubCat1, setIsFocusSubCat1] = useState(false);
  const [isFocusSubCat2, setIsFocusSubCat2] = useState(false);
  const [isFocusSubCat3, setIsFocusSubCat3] = useState(false);
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [result, setResult] = useState(false);
  const { searchProduct: searchProducts, loading: searchLoading } = useSelector(
    (state: any) => state?.searchSuggestionProduct
  );
  console.log("search product 5555", searchProducts);
  const {
    categories: categories,
    subCategories1: subCategories1,
    subCategories2: subCategories2,
    subCategories3: subCategories3,
  } = useSelector((state: any) => state?.allCategories);
  const [formData, setFormData] = useState({
    Category: "",
    SubCat1: "",
    SubCat2: "",
    SubCat3: "",
    ProdCode: "",
    Description: "",
    UPC: "",
    Brand: "",
    ProdCodes: "",
    MinPrice: 0,
    MaxPrice: 0,
    PageNumber: 1,
    PageSize: 48,
  });
  const getCategories = async () => {
    await dispatch(fetchCategories(formData));
  };
  const getSubCategories1 = async (formData: any) => {
    await dispatch(fetchSubCategories1(formData));
  };
  const getSubCategories2 = async (formData: any) => {
    await dispatch(fetchSubCategories2(formData));
  };
  const getSubCategories3 = async (formData: any) => {
    await dispatch(fetchSubCategories3(formData));
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Layout>
      <View style={styles.container}>
        <View style={{ width: "15%" }}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <AntDesign name="left" size={35} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "85%" }}>
          <SearchBar
            value={searchText.SearchText}
            onChangeText={(value: any) => {
              const updatedSearchText = {
                ...searchText,
                SearchText: value,
              };
              setSearchText(updatedSearchText);
              setResult(true);

              if (value.trim() !== "") {
                seachSuggestion(updatedSearchText);
              }
            }}
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            inputStyle={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}
            placeholderTextColor={"rgba(255,255,255,0.8)"}
            loading={searchLoading}
            onSubmitEditing={() => {
              if (searchText.SearchText.trim() !== "") {
                navigation.navigate("ProductList", {
                  title: ProductListEnum.SEARCH_PRODUCT_LIST,
                  searchText: searchText,
                });
                setResult(false);
              }
            }}
          />
        </View>
      </View>
      <ScrollView
        style={{ backgroundColor: "white", flex: 1, paddingBottom: 10 }}
      >
        <View>
          {searchText.SearchText.trim() !== "" &&
          searchProducts?.ProductSearchList &&
          searchProducts?.ProductSearchList?.length ? (
            <FlatList
              data={searchProducts.ProductSearchList}
              renderItem={(item) => (
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProductDetail", {
                        ProductCode: item?.item,
                      });
                    }}
                  >
                    <View style={styles.searchSuggestion}>
                      <Ionicons name="search" size={30} color={"gray"} />
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.description}>
                          {item.item.Description}
                        </Text>
                        <Text style={{marginTop:-10}}>{item.item.ProdCode}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              )}
            />
          ) : searchText.SearchText.trim() !== "" &&
            result &&
            (searchProducts?.ProductSearchList == null ||
              searchProducts?.ProductSearchList == undefined) ? (
            <View style={{ paddingVertical: 20 }}>
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
          ) : (
            <>
              <View style={{ marginHorizontal: 25, marginVertical: 30 }}>
                <TouchableOpacity
                  onPress={() => setAdvanceSearch(!advanceSearch)}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: "Inter-Bold",
                          color: "black",
                        }}
                      >
                        Advance Search
                      </Text>
                    </View>
                    <View>
                      <FontAwesome6
                        name={advanceSearch ? "angle-up" : "angle-down"}
                        size={30}
                        color={theme.colors.arrowGray}
                      ></FontAwesome6>
                    </View>
                  </View>
                </TouchableOpacity>
                {!advanceSearch && (
                  <View
                    style={{
                      backgroundColor: "#ececec",
                      paddingVertical: 1,
                      marginTop: 20,
                    }}
                  ></View>
                )}
              </View>
            </>
          )}
          {searchText.SearchText.trim() == "" && advanceSearch ? (
            <View
              style={{
                backgroundColor: "#F6F8FC",
                paddingTop: 30,
                marginHorizontal: 20,
                borderRadius: 20,
                marginBottom: 40,
                paddingBottom: 40,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                }}
              >
                <View style={{ width: "40%" }}>
                  <Text
                    style={{
                      color: "#484848",
                      fontFamily: "Inter-SemiBold",
                      fontSize: 18,
                      marginBottom: 15,
                    }}
                  >
                    ProductCode
                  </Text>
                  <CommonTextInput
                    value={formData.ProdCode}
                    onChangeText={(value: any) => {
                      setFormData({ ...formData, ProdCode: value });
                    }}
                    style={{ backgroundColor: "white" }}
                  ></CommonTextInput>
                </View>

                <View style={{ width: "40%" }}>
                  <Text
                    style={{
                      color: "#484848",
                      fontFamily: "Inter-SemiBold",
                      fontSize: 18,
                      marginBottom: 15,
                    }}
                  >
                    UPC/UOM
                  </Text>
                  <CommonTextInput
                    value={formData.UPC}
                    onChangeText={(value: any) => {
                      setFormData({ ...formData, UPC: value });
                    }}
                    style={{ backgroundColor: "white" }}
                  ></CommonTextInput>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                }}
              >
                <View style={{ width: "40%" }}>
                  <Text
                    style={{
                      color: "#484848",
                      fontFamily: "Inter-SemiBold",
                      fontSize: 18,
                      marginBottom: 15,
                    }}
                  >
                    Category
                  </Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocusCat && { borderColor: theme.colors.primary },
                    ]}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={{ color: "black" }}
                    iconStyle={styles.iconStyle}
                    data={categories ?? []}
                    maxHeight={350}
                    labelField="Category"
                    valueField="Category"
                    placeholder={!isFocusCat ? "Select" : "..."}
                    placeholderStyle={{
                      color: "black",
                      fontFamily: "Inter-Medium",
                    }}
                    value={formData.Category}
                    onFocus={() => setIsFocusCat(true)}
                    onBlur={() => setIsFocusCat(false)}
                    onChange={(item: any) => {
                      const updatedFormData = {
                        ...formData,
                        Category: item.Category,
                        SubCat1: "",
                        SubCat2: "",
                        SubCat3: "",
                      };
                      setFormData(updatedFormData);
                      setIsFocusCat(false);
                      getSubCategories1(updatedFormData);
                    }}
                  />
                </View>

                <View style={{ width: "45%" }}>
                  <Text
                    style={{
                      color: "#484848",
                      fontFamily: "Inter-SemiBold",
                      fontSize: 18,
                      marginBottom: 15,
                    }}
                  >
                    Sub Category 1
                  </Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocusSubCat1 && { borderColor: theme.colors.primary },
                    ]}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={{ color: "black" }}
                    data={subCategories1 ?? []}
                    maxHeight={350}
                    labelField="SubCategory1"
                    valueField="SubCategory1"
                    placeholder={!isFocusSubCat1 ? "Select" : "..."}
                    placeholderStyle={{
                      color: "black",
                      fontFamily: "Inter-Medium",
                    }}
                    value={formData.SubCat1}
                    onFocus={() => setIsFocusSubCat1(true)}
                    onBlur={() => setIsFocusSubCat1(false)}
                    onChange={(item: any) => {
                      const updatedFormData = {
                        ...formData,
                        SubCat1: item.SubCategory1,
                        SubCat2: "",
                        SubCat3: "",
                      };
                      setFormData(updatedFormData);
                      setIsFocusSubCat1(false);
                      getSubCategories2(updatedFormData);
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                }}
              >
                <View style={{ width: "40%" }}>
                  <Text
                    style={{
                      color: "#484848",
                      fontFamily: "Inter-SemiBold",
                      fontSize: 18,
                      marginBottom: 15,
                    }}
                  >
                    Sub Category 2
                  </Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocusSubCat2 && { borderColor: theme.colors.primary },
                    ]}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    itemTextStyle={{ color: "black" }}
                    data={subCategories2 ?? []}
                    maxHeight={350}
                    labelField="SubCategory2"
                    valueField="SubCategory2"
                    placeholder={!isFocusSubCat2 ? "Select" : "..."}
                    placeholderStyle={{
                      color: "black",
                      fontFamily: "Inter-Medium",
                    }}
                    value={formData.SubCat2}
                    onFocus={() => setIsFocusSubCat2(true)}
                    onBlur={() => setIsFocusSubCat2(false)}
                    onChange={(item: any) => {
                      const updatedFormData = {
                        ...formData,
                        SubCat2: item.SubCategory2,
                        SubCat3: "",
                      };
                      setFormData(updatedFormData);
                      setIsFocusSubCat2(false);
                      getSubCategories3(updatedFormData);
                    }}
                  ></Dropdown>
                </View>

                <View style={{ width: "40%" }}>
                  <Text
                    style={{
                      color: "#484848",
                      fontFamily: "Inter-SemiBold",
                      fontSize: 18,
                      marginBottom: 15,
                    }}
                  >
                    Sub Category 3
                  </Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                      isFocusSubCat3 && { borderColor: theme.colors.primary },
                    ]}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={subCategories3 ?? []}
                    itemTextStyle={{ color: "black" }}
                    maxHeight={350}
                    labelField="SubCategory3"
                    valueField="SubCategory3"
                    placeholder={!isFocusSubCat3 ? "Select" : "..."}
                    placeholderStyle={{
                      color: "black",
                      fontFamily: "Inter-Medium",
                    }}
                    value={formData.SubCat3}
                    onFocus={() => setIsFocusSubCat3(true)}
                    onBlur={() => setIsFocusSubCat3(false)}
                    onChange={(item: any) => {
                      const updatedFormData = {
                        ...formData,
                        SubCat3: item.SubCategory3,
                      };
                      setFormData(updatedFormData);
                      setIsFocusSubCat2(false);
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginHorizontal: 20,
                }}
              >
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      color: "#484848",
                      fontFamily: "Inter-SemiBold",
                      fontSize: 18,
                      marginBottom: 15,
                    }}
                  >
                    Brand
                  </Text>
                  <CommonTextInput
                    value={formData.Brand}
                    onChangeText={(value: any) => {
                      setFormData({ ...formData, Brand: value });
                    }}
                    style={{ backgroundColor: "white" }}
                  ></CommonTextInput>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginHorizontal: 20,
                }}
              >
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      color: "#484848",
                      fontFamily: "Inter-SemiBold",
                      fontSize: 18,
                      marginBottom: 15,
                    }}
                  >
                    Description
                  </Text>
                  <CommonTextInput
                    value={formData.Description}
                    onChangeText={(value: any) => {
                      setFormData({ ...formData, Description: value });
                    }}
                    style={{ backgroundColor: "white" }}
                    inputStyles={{ height: 80 }}
                  ></CommonTextInput>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginHorizontal: 20,
                  marginTop: 30,
                }}
              >
                <Text></Text>
                <SmallButton
                  title={"Search"}
                  onPress={() => {
                    navigation.navigate("ProductList", {
                      title: ProductListEnum.ADVANCED_SEARCH,
                      formData: formData,
                    });
                  }}
                />
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 5,
    position: "relative",
    zIndex: 9,
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
    fontFamily: "Inter-SemiBold",
    paddingVertical: 10,
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 10,
  },
  dropdown: {
    height: 55,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
export default GlobalSearchScreen;
