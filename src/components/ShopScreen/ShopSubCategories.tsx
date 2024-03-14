import React, { useEffect } from "react";
import Layout from "../Layout";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../../elements/SearchBar";
import theme from "../../config/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import { IMAGES } from "../../utilities/images";
import { useAppDispatch } from "../../redux/store";
import {
  fetchSub1CategoriesForShop,
  fetchSubCategoriesForShop,
} from "../../redux/actions/categories";
import { useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";

const ShopSubCategories = ({ route, navigation }: any) => {
  const dispatch = useAppDispatch();
  const {
    shopSubCategories: shopSubCategories,
    shopSub1Categories: shopSub1Categories,
  } = useSelector((state: any) => state.allCategories);
  const formData = {
    Category: "",
    SubCat1: "",
    SubCat2: "",
    SubCat3: "",
    SearchText: "",
  };
  const fetchData = async () => {
    try {
      await Promise.all(
        shopSubCategories?.map(async (item: any) => {
          await dispatch(
            fetchSub1CategoriesForShop({
              ...formData,
              SubCat1: item.SubCategory1,
            })
          );
        })
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    dispatch(
      fetchSubCategoriesForShop({
        ...formData,
        Category: route.params.categories.CategoryName,
      })
    );
  }, [route]);

  return (
    <Layout>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <View style={{ width: "15%" }}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <AntDesign name="left" size={35} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={{ width: "85%" }}>
            <SearchBar
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              inputStyle={{ color: "rgba(255,255,255,0.8)", fontSize: 17 }}
              placeholderTextColor={"rgba(255,255,255,0.8)"}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            paddingLeft: 30,
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "Inter-SemiBold" }}>
            {route.params.categories.CategoryName}
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.SHOPBANNER}
            style={[{ flex: 1 }]}
            resizeMode="contain"
          />
        </View>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          {shopSubCategories?.map((item: any, index: any) => {
            return (
              <>
                <View key={index}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.cardText}>{item.SubCategory1}</Text>
                    <Entypo
                      name="chevron-right"
                      size={35}
                      color={theme.colors.primary}
                    ></Entypo>
                  </View>
                 
                </View>
              </>
            );
          })}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
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
    width: "100%",
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
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#494949",
    padding: 5,
  },
  iconImage: {
    height: 80,
    width: 100,
  },
});
export default ShopSubCategories;
