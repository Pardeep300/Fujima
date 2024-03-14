import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../../../config/theme";
import { getImageUrl } from "../../../utilities/getImageUrl";
import SmallButton from "../../../elements/SmallButton";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../../redux/store";
import { addItem } from "../../../redux/reducers/comparedSlice";
import { useSelector } from "react-redux";
import { fetchComparedProduct } from "../../../redux/actions/comparion";
import { useNavigation } from "@react-navigation/native";

const TableBody = ({ data, loading }: any) => {
  const [products, setProducts] = useState([]);
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data && data.ProductList && data.ProductList.length) {
      setProducts(data.ProductList);
    }
  }, [data]);
  const removeItem = async (productCode: any) => {
    let storeProduct: any = await AsyncStorage.getItem("comparedItems");
    storeProduct = JSON.parse(storeProduct);
    const index = storeProduct.findIndex(
      (item: any) => item.ProdCode === productCode
    );
    if (index !== -1) {
      storeProduct.splice(index, 1);
      await AsyncStorage.setItem("comparedItems", JSON.stringify(storeProduct));
      dispatch(addItem(JSON.stringify(storeProduct)));
      const parseItem = storeProduct;
      const prodCodesAndUomCodes = parseItem.map((item: any) => ({
        ProdCode: item.ProdCode,
        UomCode: item.DisplayUOM,
      }));
      dispatch(fetchComparedProduct(prodCodesAndUomCodes));
      if (parseItem.length == 0) {
        navigation.pop();
      }
    } else {
      console.log("Product not found in the list");
    }
  };
  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  ) : products && products.length ? (
    products.map((product: any, index: number) => {
      return (
        <View key={index} style={styles.container}>
          <View style={styles.head}>
            <View style={styles.closeIcon}>
              <TouchableOpacity
                onPress={() => {
                  removeItem(product?.ProdCode);
                }}
              >
                <Entypo name="circle-with-cross" size={25} color={"#484848"} />
              </TouchableOpacity>
            </View>
            <View style={styles.product_image}>
              <Image
                width={110}
                height={110}
                resizeMode="center"
                source={{ uri: getImageUrl(product?.MainImageFileName) }}
              />
            </View>
            <Text numberOfLines={2} style={styles.product_description}>
              {product?.Description}
            </Text>
            <Text style={styles.product_code}>{product?.ProdCode}</Text>
          </View>
          <View>
            <View style={styles.row}>
              <Text style={styles.head_color}>${product.Price}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.head_color}>{product.UpcCode ?? "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.head_color}>{product.Brand ?? "N/A"} </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.head_color}>
                {product.Category ?? "N/A"}{" "}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.head_color}>
                {product.SubCategory1 ?? "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.head_color}>
                {product.SubCategory2 ?? "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.head_color}>
                {`${product.Weight} lbs` ?? "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.head_color}>{product.Colour ?? "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.head_color}>
                {`${product.Dim1}L | ${product.Dim2}W | ${product.Dim3}H| (Inches)` ??
                  "N/A"}
              </Text>
            </View>
            <View style={styles.lastRow}>
              <SmallButton
                title={"Add to Cart"}
                onPress={() => console.log("Next")}
              />
            </View>
          </View>
        </View>
      );
    })
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 300,
    minWidth: 100,
    width: Dimensions.get("screen").width / 2,
    borderRightColor: theme.colors.borderGray1,
    borderRightWidth: 1,
    paddingVertical: 20,
  },
  head: {
    justifyContent: "center",
    alignItems: "center",
    height: 230,
    width: "100%",
    borderBottomColor: theme.colors.borderGray1,
    borderBottomWidth: 1,
    paddingHorizontal: 18,
  },
  product_image: {
    borderWidth: 1.5,
    borderColor: theme.colors.borderGray1,
    borderRadius: 20,
    padding: 10,
    height: 135,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  product_description: {
    fontWeight: "700",
    textAlign: "center",
    color: theme.colors.darkGray,
    marginTop: 10,
  },
  product_code: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.blue,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 5,
    marginLeft:5
  },
  row: {
    borderBottomColor: theme.colors.borderGray1,
    borderBottomWidth: 1,
    height: 45,
    justifyContent: "center",
    paddingLeft: 18,
  },
  head_color: {
    color: "#484848",
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  lastRow: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 50,
  },
});

export default TableBody;
