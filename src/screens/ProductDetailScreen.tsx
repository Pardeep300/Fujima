import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../elements/SearchBar";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useAppDispatch } from "../redux/store";
import { getSearchProductforHome } from "../redux/actions/search";
import { useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchReleatedProducts,
} from "../redux/actions/product";
import Carousel from "react-native-reanimated-carousel";
import { IMAGE_URL } from "../config/extras";
import ProductData from "../components/productData/ProductData";
import SmallButton from "../elements/SmallButton";
import Layout from "../components/Layout";
import theme from "../config/theme";
import Dots from "react-native-dots-pagination";
import PriceTable from "../components/ProductDetails/PriceTable/PriceTable";
import QuantiyDiscountTable from "../components/ProductDetails/QuantityDiscountTable/QuantityDiscountTable";
import PurchaseHistoryTable from "../components/ProductDetails/PurchaseHistoryTable/PurchaseHistoryTable";
import CartQuantityButton from "../components/CartQuantityButton/CartQuantityButton";
import SkeletonLoader from "../components/ShimmerPlaceholder/SkeletonLoader";
import ShimmerProductData from "../components/ShimmerPlaceholder/ShimmerProductData";
import API from "../api/API";
import { IMAGES } from "../utilities/images";

const ProductDetailScreen = ({ navigation, route,brandName }: any) => {
  const dispatch = useAppDispatch();
  const [fav, setFav] = useState(false);
  const [searchText, setSearchText] = useState({
    SearchText: "",
    PageSize: 48,
    OrderBy: "Price",
    PageNumber: 1,
    OrderDirection: "ASC",
    Type: "",
    MinPrice: 0,
    MaxPrice: 0,
    isStockChecked: false,
    Category: "",
    SubCat1: "",
    SubCat2: "",
    SubCat3: "",
    ProdCodes: "",
    IsNewArrival: 0,
  });
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const { ProductCode } = route?.params;
  const fromData = {
    PageSize: 48,
    ProductCode: ProductCode?.ProdCode,
    UOMCode: ProductCode?.UOMCode,
  };
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { searchProduct: searchProducts, loading: searchLoading } = useSelector(
    (state: any) => state?.searchSuggestionProduct
  );
  const { productDetails: productData, loading: productDetailsLoading } =
    useSelector((state: any) => state.products);
  const { releatedProduct: releatedProduct, loading: releatedProductLoading } =
    useSelector((state: any) => state.products);
  const seachSuggestion = async (updatedSearchText: any) => {
    await dispatch(getSearchProductforHome(updatedSearchText));
  };
  const getProductDetailsData = async () => {
    await dispatch(fetchProductDetails({ ProductCode: ProductCode?.ProdCode }));
  };
  const getReleatedProducts = async () => {
    await dispatch(fetchReleatedProducts(fromData));
  };
  useEffect(() => {
    getProductDetailsData();
    getReleatedProducts();
  }, [route]);
  useEffect(() => {
    if (productData && productData?.Images) {
      setImages(productData?.Images ?? []);
    } else {
      setImages([]);
    }
  }, [productData]);
  const fetchproductbybrand=async()=>{
      const res = await API.post("/Fujimausa/GetProducts",brandName)
      console.log("=======ress=======",res)
  }
  useEffect(()=>{
    fetchproductbybrand()
  })
  return (
    <>
      <Layout>
        <ScrollView style={{height:"100%",marginBottom:90}}>
          <View style={styles.mainContainer}>
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
                  if (value.trim() !== "") {
                    seachSuggestion(updatedSearchText);
                  }
                }}
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                inputStyle={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}
                placeholderTextColor={"rgba(255,255,255,0.8)"}
                loading={searchLoading}
              />
            </View>
          </View>
          <View style={styles.imageContainer}>
            {productDetailsLoading ? (
              <View style={styles.activityContainer}>
                <SkeletonLoader height={250} width={200}></SkeletonLoader>
              </View>
            ) : (
              <View>
                {productData?.Images &&
                productData?.Images != null &&
                productData?.Images != undefined ? (
                  <Carousel
                    style={{ alignSelf: "center" }}
                    width={250}
                    height={250}
                    loop={false}
                    data={productData?.Images}
                    scrollAnimationDuration={1000}
                    defaultIndex={selectedImageIndex}
                    pagingEnabled={true}
                    onScrollEnd={(index) => setSelectedImageIndex(index)}
                    renderItem={({ item }: any) => {
                      const image = `${IMAGE_URL}${item.ThumbnailImageFileName}`;
                      return (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={{ uri: image }}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </View>
                      );
                    }}
                  />
                ) : (
                  <Image
                    source={IMAGES.DEFAULT}
                    style={{ height: 250, width: 250 }}
                  ></Image>
                )}
                <View style={{ position: "relative", marginTop: 30 }}>
                  <View style={styles.pagination}>
                    <Dots
                      length={productData?.Images?.length ?? 1}
                      active={selectedImageIndex ?? 0}
                      activeColor={"#606060"}
                      passiveColor={"#9D9D9D"}
                      marginHorizontal={5}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    alignItems: "center",
                  }}
                >
                  <ScrollView
                    contentContainerStyle={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 10,
                      height:500
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {images.map((item: any, index: any) => {
                      const image = `${IMAGE_URL}${item.ThumbnailImageFileName}`;
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => setSelectedImageIndex(index)}
                        >
                          <View
                            style={{
                              alignItems: "center",
                              borderWidth: 2,
                              borderColor: "#D9D9D9",
                              marginRight: 5,
                            }}
                          >
                            <Image
                              source={{ uri: image }}
                              style={{ width: 60, height: 60, margin: 5 }}
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            )}

            <View
              style={{
                backgroundColor: "#eef4fd",
                padding: 5,
                borderRadius: 20,
                position: "absolute",
                top: 20,
                right: 20,
              }}
            >
              <TouchableOpacity onPress={() => setFav(!fav)}>
                {fav ? (
                  <AntDesign color={"#246BAC"} size={25} name={"heart"} />
                ) : (
                  <AntDesign color={"#246BAC"} size={25} name={"hearto"} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{ backgroundColor: "#ececec", paddingVertical: 8 }}
          ></View>
          <View style={{ backgroundColor: "white", padding: 20 }}>
            {productDetailsLoading ? (
              <View
                style={{
                  gap: 10,
                  height: 100,
                  width: 250,
                  flex: 1,
                  borderRadius: 10,
                }}
              >
                <SkeletonLoader height={100} width={250}></SkeletonLoader>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    color: "#793333",
                    fontFamily: "Inter-ExtraBold",
                    fontSize: 20,
                    marginBottom: 10,
                  }}
                >
                  {productData?.ProdCode}
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "Inter-Bold",
                    color: "#494949",
                    marginBottom: 10,
                  }}
                >
                  {productData?.Description}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Inter-Bold",
                    color: "black",
                  }}
                >
                  ${productData?.Price}{" "}
                  <Text
                    style={{ color: "#596C9E", fontSize: 16,fontFamily: "Inter-Medium" }}
                  >
                    {`(${productData?.DisplayUOM})`}
                  </Text>
                </Text>
                {productData?.LongDescription && (
                  <View
                    style={{
                      borderBottomWidth: 4,
                      borderBottomColor: "#DADADA",
                      marginTop: 20,
                    }}
                  />
                )}
              </View>
            )}
            {productDetailsLoading ? (
              <>
                <View
                  style={{
                    gap: 10,
                    height: 20,
                    width: 100,
                    flex: 1,
                    marginTop: 30,
                    borderRadius: 10,
                  }}
                >
                  <SkeletonLoader height={20} width={100}></SkeletonLoader>
                </View>
                <View
                  style={{
                    gap: 10,
                    height: 50,
                    width: 200,
                    flex: 1,
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                >
                  <SkeletonLoader height={50} width={200}></SkeletonLoader>
                </View>
              </>
            ) : (
              productData?.LongDescription && (
                <View style={{ marginVertical: 20 }}>
                  <Text
                    style={{
                      color: "#1F1F1F",
                      fontFamily: "Inter-ExtraBold",
                      fontSize: 18,
                    }}
                  >
                    Product Information
                  </Text>
                  <Text
                    style={{
                      color: "#808080",
                      fontFamily: "Inter-Bold",
                      fontSize: 13,
                      marginTop: 10,
                    }}
                  >
                    {productData?.LongDescription}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 4,
                      borderBottomColor: "#DADADA",
                      marginTop: 20,
                    }}
                  />
                </View>
              )
            )}
            
          </View>
          <View
            style={{ backgroundColor: "#ececec", paddingVertical: 8 }}
          ></View>
          <View style={{ backgroundColor: "white", padding: 20 }}>
            {productDetailsLoading ? (
              <>
                <View
                  style={{
                    gap: 10,
                    height: 20,
                    width: 100,
                    flex: 1,
                    marginTop: 30,
                    borderRadius: 10,
                  }}
                >
                  <SkeletonLoader height={20} width={100}></SkeletonLoader>
                </View>
                <View
                  style={{
                    gap: 10,
                    height: 150,
                    width: 250,
                    flex: 1,
                    marginTop: 10,
                    marginLeft: 20,
                    borderRadius: 10,
                  }}
                >
                  <SkeletonLoader height={150} width={300}></SkeletonLoader>
                </View>
              </>
            ) : (
              <QuantiyDiscountTable productData={productData} />
            )}
            {productDetailsLoading ? (
              <>
                <View
                  style={{
                    gap: 10,
                    height: 20,
                    width: 100,
                    flex: 1,
                    marginTop: 30,
                    borderRadius: 10,
                  }}
                >
                  <SkeletonLoader height={20} width={100}></SkeletonLoader>
                </View>
                <View
                  style={{
                    gap: 10,
                    height: 150,
                    width: 250,
                    flex: 1,
                    marginTop: 10,
                    marginLeft: 20,
                    borderRadius: 10,
                  }}
                >
                  <SkeletonLoader height={150} width={300}></SkeletonLoader>
                </View>
              </>
            ) : (
              <PriceTable productData={productData}></PriceTable>
            )}

            {productDetailsLoading ? (
              <>
                <View
                  style={{
                    gap: 10,
                    height: 20,
                    width: 100,
                    flex: 1,
                    marginTop: 30,
                    borderRadius: 10,
                  }}
                >
                  <SkeletonLoader height={20} width={100}></SkeletonLoader>
                </View>
                <View
                  style={{
                    gap: 10,
                    height: 150,
                    width: 250,
                    flex: 1,
                    marginTop: 10,
                    marginLeft: 20,
                    borderRadius: 10,
                  }}
                >
                  <SkeletonLoader height={150} width={300}></SkeletonLoader>
                </View>
              </>
            ) : (
              <PurchaseHistoryTable
                productData={productData}
              ></PurchaseHistoryTable>
            )}
            {productDetailsLoading ? (
              <>
                <View
                  style={{
                    gap: 10,
                    height: 20,
                    width: 100,
                    flex: 1,
                    marginTop: 20,
                    borderRadius: 10,
                  }}
                >
                  <SkeletonLoader height={20} width={100}></SkeletonLoader>
                </View>
                <View
                  style={{
                    gap: 10,
                    height: 100,
                    width: 300,
                    flex: 1,
                    marginTop: 20,
                    borderRadius: 10,
                  }}
                >
                  <SkeletonLoader height={100} width={300}></SkeletonLoader>
                </View>
              </>
            ) : productData?.Brand ||
              productData?.Category ||
              productData?.SubCategory1 ||
              productData?.SubCategory2 ? (
              <View style={{marginTop:10}}>
                {productData?.Brand && (
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "Inter-SemiBold",
                    }}
                  >
                    Brand:{" "}
                    <Text style={{ color: "#808080" }}>
                      {productData?.Brand}
                    </Text>
                  </Text>
                )}
                <View
                  style={{
                    gap: 10,
                    backgroundColor: "#F0F8FD",
                    padding: 15,
                    marginTop: 15,
                  }}
                >
                  {productData?.Category && (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#616161",
                          fontSize: 17,
                          fontFamily: "Inter-SemiBold",
                        }}
                      >
                        Category
                      </Text>
                      <AntDesign
                        name="arrowright"
                        size={25}
                        color={"#3C7497"}
                      ></AntDesign>
                      <Text
                        style={{
                          color: "#3C7497",
                          fontSize: 17,
                          fontFamily: "Inter-Medium",
                        }}
                      >
                        {productData?.Category}
                      </Text>
                    </View>
                  )}
                  {productData?.SubCategory1 && (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#616161",
                          fontSize: 17,
                          fontFamily: "Inter-SemiBold",
                        }}
                      >
                        Sub-Category 1
                      </Text>
                      <AntDesign
                        name="arrowright"
                        size={25}
                        color={"#3C7497"}
                      ></AntDesign>
                      <Text
                        style={{
                          color: "#3C7497",
                          fontSize: 17,
                          fontFamily: "Inter-Medium",
                        }}
                      >
                        {productData?.SubCategory1}
                      </Text>
                    </View>
                  )}
                  {productData?.SubCategory2 && (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#616161",
                          fontSize: 17,
                          fontFamily: "Inter-SemiBold",
                        }}
                      >
                        Sub-Category 2
                      </Text>
                      <AntDesign
                        name="arrowright"
                        size={25}
                        color={"#3C7497"}
                      ></AntDesign>
                      <Text
                        style={{
                          color: "#3C7497",
                          fontSize: 17,
                          fontFamily: "Inter-Medium",
                        }}
                      >
                        {productData?.SubCategory2}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ) : null}
          </View>
          
          <View style={{ backgroundColor: "#f4f4f4", paddingVertical: 20 }}>
            {productDetailsLoading ? (
              <ShimmerProductData></ShimmerProductData>
            ) : (
              <>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Inter-Bold",
                      color: "#1F1F1F",
                    }}
                  >
                    Related Products
                  </Text>
                </View>
                <FlatList
                  style={{
                    paddingHorizontal: 20,
                    marginRight: 10,
                    paddingRight: 10,
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={releatedProduct?.ProductList}
                  renderItem={(item) => (
                    <ProductData productData={item}></ProductData>
                  )}
                ></FlatList>
              </>
            )}
          </View>
         
        </ScrollView>
        <View style={styles.bottomContainer}>
            <View>
              <Text
                style={{
                  color: "#969696",
                  fontFamily: "Inter-Bold",
                  fontSize: 18,
                  textAlign: "left",
                }}
              >
                Quantity
              </Text>
              <CartQuantityButton
                quantity={quantity}
                setQuantity={setQuantity}
              ></CartQuantityButton>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <SmallButton
                title={"Add to Cart"}
                onPress={() => console.log("Add to Cart")}
                textStyle={{ color: "white" }}
                style={{ marginVertical: 0 }}
              />
            </View>
          </View>
      </Layout>
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 50,
    marginBottom: 50,
  },
  mainContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 5,
    position: "relative",
    zIndex: 9,
  },
  imageContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    paddingVertical: 25,
  },
  activityContainer: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  pagination: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
  },
  bottomContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 20,
  },
  relatedProductsContainer: {
    backgroundColor: "#f4f4f4",
    paddingVertical: 20,
  },
});
