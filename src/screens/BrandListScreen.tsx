import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Layout from "../components/Layout";
import Header from "../elements/Header";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { getHomeBrand } from "../redux/actions/banner";
import { IMAGE_URL } from "../config/extras";
import { TouchableOpacity } from "react-native-gesture-handler";

const BrandListScreen = ({ route ,navigation }: any) => {
  
  const dispatch = useAppDispatch();
  const { homeBrands, loading: brandsLoading } = useSelector(
    (state: any) => state?.banners
  );

  const initialize = async () => {
    await dispatch(getHomeBrand());
    
  };
console.log("brandimaimage===",homeBrands.Brands.ImagePath)
  useEffect(() => {
    initialize();
  }, []);
  const [brandName,setBrandName]=useState()
    const selectBrand = (brand: any) => {
    navigation.navigate("ProductList", {
      title: "Brand",
      brandName: brand, // Pass the selected brand name
    });
  };
  return (
    <Layout>
      <Header title={"Brands"} />
      <ScrollView>
        <View
          style={{
            backgroundColor: "#f4f4f4",
            paddingBottom: 20,
          }}
        >
          <View style={styles.container}>
              {homeBrands?.Brands?.map((item: any, index: number) => {
                return (
                  <View key={index}>
                    <TouchableOpacity onPress={()=>selectBrand(item.ManufacturerName)}>
                    <View
                      style={{
                        backgroundColor: "white",
                        marginHorizontal: 10,
                        borderRadius: 20,
                        paddingVertical: 5,
                        width: (Dimensions.get("window").width - 90) / 2,
                        maxWidth: 250,
                        overflow: "hidden",
                        paddingHorizontal: 20,
                        height: 100,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Image
                        source={{ uri: `${IMAGE_URL}${item?.ImagePath}` }}
                        style={{ height: '100%', width: '100%' }}
                        resizeMode="contain"
                      />
                    </View>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', marginTop: 15, fontWeight: '500', fontSize: 18,color:'black' }}>{item?.ManufacturerName}</Text>
                  </View>
                );
              })}
            </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default BrandListScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingTop: 20
  },
});
