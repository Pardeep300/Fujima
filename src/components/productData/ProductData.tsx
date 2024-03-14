import React, { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import SmallButton from "../../elements/SmallButton";
import { IMAGE_URL } from "../../config/extras";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { useAppDispatch } from "../../redux/store";
import { addItem } from "../../redux/reducers/comparedSlice";
import { useSelector } from "react-redux";

interface ProductDataProps {
  productData: any;
  style?: any;
  smallButtonStyle?: any;
  description_lines?: number;
  arrow_size?: number;
  index?: string;
  addToCart?:any
}
const ProductData: React.FC<ProductDataProps> = ({
  productData,
  style = {},
  smallButtonStyle = {},
  description_lines = 2,
  arrow_size = 18,
  index,
  addToCart
}) => {
  const productImage: ImageSourcePropType = {
    uri: IMAGE_URL + productData.item.ThumbnailImageFileName,
  };
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const [userInfo, setUserInfo] = useState({});

  const [fav, setFav] = useState(false);
  const storeItem = async (productItem: any) => {
    try {
      const existingItemsJSON = await AsyncStorage.getItem("comparedItems");
      let existingItems = [];

      if (existingItemsJSON) {
        existingItems = JSON.parse(existingItemsJSON);
      }
      const duplicateItem = existingItems.some(
        (item: any) => item.ProdCode == productItem.ProdCode
      );
      if (existingItems.length >= 4) {
        showMessage({
          message: "You can add up to 4 items in the compared list.",
          titleStyle: {
            fontFamily: "Inter-SemiBold",
            fontSize: 16,
            color: "white",
          },
          floating: true,
          duration: 4000,
          style: {
            backgroundColor: "#883333",
            width: "90%",
            padding: 25,
            borderRadius: 10,
            alignSelf: "center",
          },
        });
      } else if (duplicateItem) {
        showMessage({
          message: "This item is already in the compared list.",
          titleStyle: {
            fontFamily: "Inter-SemiBold",
            fontSize: 16,
            color: "white",
          },
          floating: true,
          duration: 4000,
          style: {
            backgroundColor: "#883333",
            width: "90%",
            padding: 25,
            borderRadius: 10,
            alignSelf: "center",
          },
        });
      } else {
        existingItems.push(productItem);
        const updatedItemsJSON = JSON.stringify(existingItems);
        await AsyncStorage.setItem("comparedItems", updatedItemsJSON);
        dispatch(addItem(updatedItemsJSON));
      }
    } catch (error) {
      console.error("Error storing item:", error);
    }
  };


  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetail", {
          ProductCode: productData?.item,
        })
      }
    >
      <View
        key={index}
        style={{
          backgroundColor: "#fff",
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 10,
          width: 220,
          marginTop: 30,
          marginRight: 20,
          minHeight: 300,
          ...style,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#793333",
              fontFamily: "Inter-ExtraBold",
              fontSize: 16,
            }}
          >
            {productData.item.ProdCode}
          </Text>
          <TouchableOpacity onPress={() => setFav(!fav)}>
            <View
              style={{
                backgroundColor: "#eef4fd",
                padding: 5,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {fav ? (
                <AntDesign color={"#246BAC"} size={20} name={"heart"} />
              ) : (
                <AntDesign color={"#246BAC"} size={20} name={"hearto"} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={productImage}
            style={{ height: 100, width: 100 }}
          ></Image>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Inter-Medium",
              color: "#494949",
              marginBottom: 10,
            }}
            numberOfLines={description_lines}
          >
            {productData.item.Description}
          </Text>

          <Text
            style={{ fontSize: 16, fontFamily: "Inter-Bold", color: "black" }}
          >
            ${productData.item.Price}{" "}
            <Text style={{ color: "#596C9E", fontFamily: "Inter-Medium" }}>
              {`(${productData.item.DisplayUOM})`}
            </Text>
          </Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <SmallButton
            title={"Add to Cart"}
            onPress={() => addToCart()}
            style={{
              width: 90,
              paddingVertical: 10,
            }}
            textStyle={{ fontSize: 12 }}
          />
          <TouchableOpacity onPress={() => storeItem(productData?.item)}>
            <View
              style={{
                backgroundColor: "#FBECEC",
                padding: 10,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Fontisto
                color={"#883333"}
                size={arrow_size}
                name={"arrow-swap"}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductData;
