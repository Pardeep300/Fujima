import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import AutoScroll from "@homielab/react-native-auto-scroll";
import { IMAGES } from "../utilities/images";
import SearchBar from "../elements/SearchBar";
import ProductData from "../components/productData/ProductData";
import Carousel from "react-native-reanimated-carousel";
import StepIndicator from "../components/comanStepbar/StepIndicator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import {
  mostRequestProductforHome,
  getClearanceProductForHome,
} from "../redux/actions/product";
import { getHomeBrand } from "../redux/actions/banner";
import { IMAGE_URL } from "../config/extras";
import { getSearchProductforHome } from "../redux/actions/search";
import Layout from "../components/Layout";
import { SEARCH_TEXT } from "../constants/HomeScreen";
import { ProductListEnum } from "../constants/Enum";
import { useIsFocused } from "@react-navigation/native";
import theme from "../config/theme";
import ComparisonButton from "../components/ComapareButton/CompareButton";
import SkeletonLoader from "../components/ShimmerPlaceholder/SkeletonLoader";
import ShimmerProductData from "../components/ShimmerPlaceholder/ShimmerProductData";
import ShimmerBrands from "../components/ShimmerPlaceholder/ShimmerBrands";
import { addProductToCart, fetchCartProducts } from "../redux/actions/addCart";

import { useSharedValue } from "react-native-reanimated";

const HomeScreen = ({ navigation }: any) => {
  const isFocus = useIsFocused();
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState(SEARCH_TEXT);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef: any = useRef();
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
  const {
    mostRequestedProduct: productData,
    clearanceProduct: clearanceData,
    loading,
  } = useSelector((state: any) => state?.products);
  
  const { homeBrands: homeBottomBrands, loading: brandsLoading } = useSelector(
    (state: any) => state?.banners
  );
  // console.log("Brands:",Object.keys(JSON.parse(homeBottomBrands)));
  
  const { searchProduct: searchProducts, loading: searchLoading } = useSelector(
    (state: any) => state?.searchSuggestionProduct
  );
  const { comparedItem: comparedItem } = useSelector(
    (state: any) => state.comparedItems
  );
  const parseItem = JSON.parse(comparedItem);

  const clearanceProducts = {
    Category: "CLEARANCE",
    SubCat1: "",
    SubCat2: "",
    SubCat3: "",
    PageSize: 48,
    OrderBy: "Price",
    PageNumber: 1,
    OrderDirection: "ASC",
    Email: "",
    MinPrice: 0,
    MaxPrice: 0,
    isStockChecked: false,
    SearchText: "",
  };
 const selectBrand=(brand:any)=>{
  navigation.navigate("ProductList", {
    title: "Brand",
    brandName: brand, // Pass the selected brand name
  });
    // console.log("========brand========",brand)
 }
  const width = Dimensions.get("window").width;
  const [data, setData] = useState([
    { image: IMAGES.BANNER },
    { image: IMAGES.BANNER },
    { image: IMAGES.BANNER },
  ]);
  const productbanner = [
    { image: IMAGES.PRODUCTBANNER },
    { image: IMAGES.PRODUCTBANNER },
    { image: IMAGES.PRODUCTBANNER },
    { image: IMAGES.PRODUCTBANNER },
    { image: IMAGES.PRODUCTBANNER },
    { image: IMAGES.PRODUCTBANNER },
    { image: IMAGES.PRODUCTBANNER },
  ];
  const [values, setValues] = useState([50]);
  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  const onIndexChanged = (value: any) => {
    setCurrentIndex(value);
  };

  const handleCarouselStepIndicatorPress = (value: number) => {
    if (carouselRef) {
      carouselRef.current.next({ count: value - currentIndex });
    }
  };

  const initialize = async () => {
    const res: any = await AsyncStorage.getItem("userInfo");
    const data = JSON.parse(res);

    await Promise.all([
      dispatch(
        mostRequestProductforHome({
          Email: data.authentication.response.Email,
        })
      ),
      dispatch(
        getClearanceProductForHome({
          ...clearanceProducts,
          Email: data.authentication.response.Email,
        })
      ),
      dispatch(getHomeBrand()),
    ]);
  };

  const seachSuggestion = async (updatedSearchText: any) => {
    await dispatch(getSearchProductforHome(updatedSearchText));
  };
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
  useEffect(() => {
    if (isFocus) {
      initialize();
    }
  }, [isFocus]);
  return (
    <Layout>
      <ScrollView>
        <View>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={data}
            scrollAnimationDuration={2000}
            renderItem={({ item }) => (
              <Image
                source={item.image}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: "#322828",
            position: "relative",
            zIndex: 9,
          }}
        >
          <SearchBar
            value={searchText.SearchText}
            onChangeText={(value: any) => {
              const updatedSearchText = {
                ...searchText,
                SearchText: value,
              };
              setSearchText(updatedSearchText);
              if (value.trim() !== "") {
                seachSuggestion(updatedSearchText);
              }
            }}
            placeholderTextColor={"#5F5F5F"}
            loading={searchLoading}
            onSubmitEditing={() => {
              navigation.navigate("ProductList", {
                title: ProductListEnum.SEARCH_PRODUCT_LIST,
                searchText: searchText,
              });
              setSearchText({ ...searchText, SearchText: "" });
            }}
            keyboardShouldPersistTaps="handled"
          />
          {searchText.SearchText.trim() !== "" &&
          searchProducts?.ProductSearchList &&
          searchProducts?.ProductSearchList?.length ? (
            <View
              style={{
                backgroundColor: "white",
                position: "absolute",
                marginTop: 75,
                left: 0,
                right: 0,
                marginHorizontal: 20,
                borderRadius: 5,
                paddingHorizontal: 20,
                height: 200,
              }}
            >
              <FlatList
                data={searchProducts?.ProductSearchList}
                renderItem={(item) => (
                  <ScrollView>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("ProductDetail", {
                          ProductCode: item?.item,
                        });
                        setSearchText({ ...searchText, SearchText: "" });
                      }}
                    >
                      <Text
                        style={{
                          color: "#20638C",
                          fontFamily: "Inter-ExtraBold",
                          paddingVertical: 10,
                        }}
                      >
                        {item.item.Description}
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                )}
              />
            </View>
          ) : null}
        </View>
        <View
          style={{
            alignItems: "center",
            paddingTop: 15,
            paddingBottom: 20,
            backgroundColor: "white",
            // paddingLeft: 20,
          }}
        >
          <Carousel
            loop
            ref={carouselRef}
            width={width}
            height={250}
            autoPlay={true}
            data={productbanner}
            scrollAnimationDuration={2000}
            onSnapToItem={(index) => onIndexChanged(index)}
            renderItem={({ item }) => (
              <Image
                source={item.image}
                style={{
                  width: "90%",
                  height: "70%",
                  borderRadius: 10,
                  marginLeft: 10,
                }}
              />
            )}
          />
          {/* <Slider
            style={styles.container2}
            progress={progress}
            minimumValue={min}
            maximumValue={max} */}
          {/* /> */}
          <StepIndicator
            steps={productbanner}
            currentIndex={currentIndex}
            handlePress={handleCarouselStepIndicatorPress}
          ></StepIndicator>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              backgroundColor: "#ebebeb",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              paddingVertical: 30,
            }}
          >
            <View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginHorizontal: 20,
                  height:"auto"
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "Inter-Bold",
                    color: "black",
                  }}
                >
                  Most requested
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductList", {
                      title: ProductListEnum.MOST_REQUESTED,
                    });
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Inter-Bold",
                      color: "#8d8d8d",
                    }}
                  >
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {loading ? (
                <View style={{ marginTop: 20 }}>
                  <ShimmerProductData></ShimmerProductData>
                </View>
              ) : (
                <FlatList
                  style={{
                    paddingHorizontal: 20,
                    marginRight: 10,
                    paddingRight: 10,
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={productData?.ProductList}
                  renderItem={(item: any) => {
                    return (
                      <ProductData
                        addToCart={() => {
                          const updatedFormData = {
                            ...formData,
                            Products: [
                              {
                                ProductCode: item.item.ProdCode,
                                Quantity: 1,
                                UOMCode: item.item.DisplayUOM,
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
                        productData={item}
                      ></ProductData>
                    );
                  }}
                ></FlatList>
              )}
            </View>
            <View style={{ marginTop: 30 }}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginHorizontal: 20,
                  borderTopLeftRadius: 35,
                  borderTopRightRadius: 35,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "Inter-Bold",
                    color: "black",
                  }}
                >
                  Clearance
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductList", {
                      title: ProductListEnum.CLEARANCE,
                    });
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Inter-Bold",
                      color: "#8d8d8d",
                    }}
                  >
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {loading ? (
                <View style={{ marginTop: 20 }}>
                  <ShimmerProductData></ShimmerProductData>
                </View>
              ) : (
                <FlatList
                  style={{
                    paddingHorizontal: 20,
                    marginRight: 10,
                    paddingRight: 10,
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={clearanceData?.ProductList}
                  renderItem={(item) => (
                    <ProductData
                      addToCart={async () => {
                        const updatedFormData = {
                          ...formData,
                          Products: [
                            {
                              ProductCode: item.item.ProdCode,
                              Quantity: 1,
                              UOMCode: item.item.DisplayUOM,
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
                      productData={item}
                    ></ProductData>
                  )}
                ></FlatList>
              )}
            </View>
            <View style={{ marginTop: 30,}}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginHorizontal: 20,
                
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "Inter-Bold",
                    color: "black",
                  }}
                >
                  Brands
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("BrandList");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Inter-Bold",
                      color: "#8d8d8d",
                    }}
                  >
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {brandsLoading ? (
                <ShimmerBrands></ShimmerBrands>
              ) : (
             
              <AutoScroll 
              duration={180000}
              delay={100}>
                <View  >
            
              <FlatList
              ref={carouselRef}
              style={{
                paddingHorizontal: 1,
                marginTop: 25,
                marginBottom: 30,
                gap:1
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={homeBottomBrands?.Brands}
              
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={()=>selectBrand(item.ManufacturerName)}>
                  <View
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 30,
                      marginHorizontal: 10,
                      borderRadius: 20,
                      marginRight: 10,
                      paddingVertical:5,
                    }}
                  >
                    <Image
                      source={{ uri: `${IMAGE_URL}${item?.ImagePath}` }}
                      style={{ width: 100, height: 100 }}
                      resizeMode="contain"
                    />
                  </View>
                  </TouchableOpacity>
                 
                );
              }}
            />
            </View>
             </AutoScroll>
              )}
            </View>
          </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
   
  },
  carouselItem: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    marginLeft:70,
    borderRadius: 20,
    paddingVertical: 15,
    width: 260
  }
});

export default HomeScreen;
