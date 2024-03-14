import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAppDispatch } from "../../redux/store";
import { IMAGE_URL } from "../../config/extras";
import CartQuantityButton from "../CartQuantityButton/CartQuantityButton";
import {
  fecthSaveLaterProduct,
  fetchCartProducts,
} from "../../redux/actions/addCart";
import { IMAGES } from "../../utilities/images";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SaveLaterItemDetails = ({
  saveLaterProducts,
  cartItem,
  removeCartProduct,
  moveToCart,
  setShow,
}: any) => {
  return (
    <View>
      {saveLaterProducts?.SavedItemsList.map((item: any, index: any) => (
        <SaveLaterItem
          index={index}
          item={item}
          cartItem={cartItem}
          removeCartProduct={removeCartProduct}
          moveToCart={moveToCart}
          setShow={setShow}
        />
      ))}
    </View>
  );
};

const SaveLaterItem = ({
  item,
  index,
  removeCartProduct,
  moveToCart,
  setShow,
}: any) => {
  const [quantity, setQuantity] = useState(item.Quantity);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    Products: [
      {
        ProdCode: "",
        ID: 0,
        UM: "",
      },
    ],
    CustomerCode: "",
    LoginId: "",
    Type: "Saved",
    currentIndex: 0,
    message: "Delete?",
  });
  const [moveCart, setMoveCart] = useState({
    Products: [
      {
        ProductCode: "",
        Quantity: 1,
        UOMCode: "",
      },
    ],
    CustomerCode: "",
    LoginId: "",
    Type: "SavedItem",
    ShoppingListId: "0",
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

  useEffect(() => {
    setQuantity(item.Quantity);
  }, [item.Quantity]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetail: any = await AsyncStorage.getItem("userInfo");
        const userDetails = JSON.parse(userDetail);
        setFormData((prevFormData) => ({
          ...prevFormData,
          CustomerCode: userDetails?.authentication.response.CustomerCode,
          LoginId: userDetails.authentication.response.LoginId,
        }));
        setGetSaveLater((prevFormData) => ({
          ...prevFormData,
          CustomerCode: userDetails.authentication.response.CustomerCode,
          LoginId: userDetails.authentication.response.LoginId,
        }));
        setMoveCart((prevFormData) => ({
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

  return (
    <TouchableWithoutFeedback onPress={() => setShow(false)}>
      <View style={{ marginBottom: 15 }} key={index}>
        <View
          style={{
            backgroundColor: "white",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <View style={{ width: "20%" }}>
              <Image
                source={{ uri: `${IMAGE_URL}${item.ThumbnailImageFileName}` }}
                style={{ height: 80, width: 80 }}
              />
            </View>
            <View
              style={{
                justifyContent: "space-between",
                width: "80%",
                paddingHorizontal: 20,
              }}
            >
              <View>
                <Text style={styles.text}>{item.ProdCode}</Text>
                <Text style={styles.text} numberOfLines={2}>
                  {item.Description}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.text}>
                    ${item.Price}
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Inter-Medium",
                        color: "#596C9E",
                      }}
                    >
                      (DP)
                    </Text>
                  </Text>
                </View>
                <View>
                  <CartQuantityButton
                    quantity={quantity}
                    setQuantity={setQuantity}
                    style={{ paddingHorizontal: 5 }}
                    textStyles={{ marginVertical: 2, marginHorizontal: 10 }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ borderWidth: 1, borderColor: "#DEDEDE" }}></View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            flex: 1,
            backgroundColor: "white",
            paddingVertical: 10,
          }}
        >
          <View style={styles.saveContainer}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={async () => {
                const updateFormData = {
                  ...moveCart,
                  Products: [
                    {
                      ProductCode: item.ProdCode,
                      Quantity: 1,
                      UOMCode: item.DisplayUOM,
                    },
                  ],
                };
                moveToCart(updateFormData);
                setMoveCart(updateFormData);
                setShow(false)
              }}
            >
              <AntDesign
                name="shoppingcart"
                color={"#777777"}
                size={30}
              ></AntDesign>
              <Text style={styles.save}>Move to cart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.saveContainer}>
            <TouchableOpacity style={styles.touchable}>
              <AntDesign name="hearto" color={"#777777"} size={25}></AntDesign>
              <Text style={styles.save}>Shopping List</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.saveContainer}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                const updatedFormData = {
                  ...formData,
                  Products: [
                    {
                      ProdCode: item.ProdCode,
                      ID: item.ID,
                      UM: item.DisplayUOM,
                    },
                  ],
                  currentIndex: index,
                };
                removeCartProduct(updatedFormData);
                dispatch(fecthSaveLaterProduct(getSaveLater));
                setShow(false)
              }}
            >
              <Feather name="x-square" color={"#777777"} size={25}></Feather>
              <Text style={styles.save}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  text: { color: "#484040", fontSize: 14, fontFamily: "Inter-Bold" },
  save: {
    color: "#777777",
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    marginLeft: 10,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "33.33%",
  },
});

export default SaveLaterItemDetails;
