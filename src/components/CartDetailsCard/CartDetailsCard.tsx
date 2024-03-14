import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { IMAGES } from "../../utilities/images";
import CartQuantityButton from "../CartQuantityButton/CartQuantityButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { IMAGE_URL } from "../../config/extras";
import { useAppDispatch } from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";

const CartDetailsCard = ({
  cartProducts,
  cartItem,
  removeCartProduct,
  saveCartProduct,
  getSaveLater,
  handleSaveClick,
  moveToCart,
  setShow,
}: any) => {
  return (
    <View>
      {cartProducts?.CartItems &&
        cartProducts?.CartItems?.map((item: any, index: any) => (
          <CartItem
            index={index}
            item={item}
            cartItem={cartItem}
            removeCartProduct={removeCartProduct}
            saveCartProduct={saveCartProduct}
            getSaveLater={getSaveLater}
            handleSaveClick={handleSaveClick}
            moveToCart={moveToCart}
            setShow={setShow}
          />
        ))}
    </View>
  );
};

const CartItem = ({
  item,
  moveToCart,
  index,
  removeCartProduct,
  saveCartProduct,
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
    Type: "Cart",
    currentIndex: 0,
    message: "Delete?",
  });
  const [saveProduct, setSaveProduct] = useState({
    Products: [
      {
        ProductCode: "",
        Quantity: 1,
        UOMCode: "",
      },
    ],
    CustomerCode: "",
    LoginId: "",
  });
  const [addCart, setAddCart] = useState({
    Products: [
      {
        ProductCode: "",
        Quantity: quantity,
        UOMCode: "",
      },
    ],
    CustomerCode: "",
    LoginId: "",
    Type: "reCalculate",
    ShoppingListId: "0",
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
          CustomerCode: userDetails.authentication.response.CustomerCode,
          LoginId: userDetails.authentication.response.LoginId,
        }));
        setSaveProduct((prevFormData) => ({
          ...prevFormData,
          CustomerCode: userDetails.authentication.response.CustomerCode,
          LoginId: userDetails.authentication.response.LoginId,
        }));
        setAddCart((prevFormData) => ({
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
                  <View style={[styles.container]}>
                    <TouchableOpacity
                      onPress={() => {
                        if (quantity > 0) {
                          const updatedQuantity = quantity - 1;
                          setQuantity(updatedQuantity);
                          const updatedData = {
                            ...addCart,
                            Products: [
                              {
                                ProductCode: item.ProdCode,
                                Quantity: updatedQuantity,
                                UOMCode: item.DisplayUOM,
                              },
                            ],
                          };
                          setAddCart(updatedData);
                          moveToCart(updatedData);
                          setShow(false);
                        }
                      }}
                      // style={{ marginLeft: 10 }}
                    >
                      <Entypo name="minus" size={20} color={"black"} />
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 20,
                        marginHorizontal: 5,
                      }}
                    >
                      <Text style={[styles.quantityText]}>{quantity}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        const updatedQuantity = quantity + 1;
                        setQuantity(updatedQuantity);
                        const updatedData = {
                          ...addCart,
                          Products: [
                            {
                              ProductCode: item.ProdCode,
                              Quantity: updatedQuantity,
                              UOMCode: item.DisplayUOM,
                            },
                          ],
                        };
                        setAddCart(updatedData);
                        moveToCart(updatedData);
                        setShow(false);
                      }}
                      // style={{ marginRight: 10 }}
                    >
                      <Entypo name="plus" size={20} color={"black"} />
                    </TouchableOpacity>
                  </View>
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
                  ...saveProduct,
                  Products: [
                    {
                      ProductCode: item.ProdCode,
                      Quantity: 1,
                      UOMCode: item.DisplayUOM,
                    },
                  ],
                };
                saveCartProduct(updateFormData);
                setShow(false);
              }}
            >
              <Image source={IMAGES.SAVE} style={{ height:22, width: 20 ,resizeMode:'contain'}} />
              <Text style={styles.save}>Save</Text>
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
                      ID: item.Id,
                      UM: item.DisplayUOM,
                    },
                  ],
                  currentIndex: index,
                };
                removeCartProduct(updatedFormData);
                setShow(false);
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
  container: {
    backgroundColor: "#DBDDDF",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 50,
    justifyContent: "space-between",
    marginTop: 8,
    minWidth: 100,
  },
  quantityText: {
    fontSize: 15,
    fontFamily: "Inter-Bold",
    marginVertical: 2,
    marginHorizontal: 8,
    color: "black",
  },
});

export default CartDetailsCard;
