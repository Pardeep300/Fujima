import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../elements/SearchBar";
import Layout from "../components/Layout";
import SmallButton from "../elements/SmallButton";
import theme from "../config/theme";
import { fetchCategoriesForShop } from "../redux/actions/categories";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { getImageUrl } from "../utilities/getImageUrl";
import Carousel from "react-native-reanimated-carousel";
import ShimmerShopCategories from "../components/ShimmerPlaceholder/ShimmerShopCategories";
import Dots from "react-native-dots-pagination";

const ShopScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { shopCategories: shopCategories, loading }: any = useSelector(
    (state: any) => state.allCategories
  );
  const width = Dimensions.get("screen").width;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  useEffect(() => {
    dispatch(fetchCategoriesForShop());
  }, []);

  return (
    <Layout>
      <ScrollView>
        <View
          style={{ paddingHorizontal: 20, marginTop: 20, paddingBottom: 10 }}
        >
          <SearchBar
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            inputStyle={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}
            placeholderTextColor={"rgba(255,255,255,0.8)"}
          />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text style={{ fontSize: 26, fontWeight: "bold", color: "black" }}>
              Shop
            </Text>
            <View><TouchableOpacity >
              <SmallButton title="Shop By Brand" style={styles.shopButton} textStyle={{ color: "#fff" }} onPress={()=>{ navigation.navigate("BrandList" as never);}} />
              </TouchableOpacity>
            </View>
          </View>
          {loading ? (
            <ShimmerShopCategories></ShimmerShopCategories>
          ) : (
            <>
              <Carousel
                loop
                width={width}
                height={width/2.5}
                autoPlay={true}
                data={shopCategories?.CategoryBanner}
                scrollAnimationDuration={1000}
                defaultIndex={selectedImageIndex}
                onScrollEnd={(index) => setSelectedImageIndex(index)}
                style={{ alignSelf: "center" }}
                renderItem={({ item }: any) => {
                  return (
                    <Image
                      source={{ uri: getImageUrl(item?.BannerPath) }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                    />
                  );
                }}
              />
              <View style={{ position: "relative", marginTop: 30 }}>
                  <View style={styles.pagination}>
                    <Dots
                      length={shopCategories?.CategoryBanner.length ?? 1}
                      active={selectedImageIndex ?? 0}
                      activeColor={"#BD1313"}
                      passiveColor={"white"}
                      marginHorizontal={5}
                    />
                  </View>
                </View>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  marginBottom: 15,
                }}
              >
                {shopCategories?.Categories.map((item: any, index: any) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ShopSubCategories", {
                          categories: item,
                        })
                      }
                      key={index}
                    >
                      <View style={styles.cardContainer}>
                        <View style={styles.iconContiner}>
                          <Image
                            source={{ uri: getImageUrl(item?.LogoPath) }}
                            style={styles.iconImage}
                          />
                        </View>
                        <Text style={styles.cardText}>{item.CategoryName}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ebebeb',
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  shopButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 10,
    marginVertical: 6,
    borderRadius: 10,
  },
  imageContainer: {
    backgroundColor: "yellow",
  },
  cardContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    height: 180,
    width: 180,
    marginTop: 20,
  },
  buttonContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContiner: {
    backgroundColor: "#F1F3FA",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 20,
  },
  cardText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Inter-Bold",
    color: "#494949",
    padding: 5,
    marginTop: 10,
  },
  iconImage: {
    height: 80,
    width: 100,
  },
  pagination: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
  },
});

export default ShopScreen;
