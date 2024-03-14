import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import HomeStack from "./HomeStack";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShopStack from "./ShopStack";
import CartStack from "./CartStack";
import { IMAGES } from "../utilities/images";
import { useAppDispatch } from "../redux/store";
import { fetchCartProducts } from "../redux/actions/addCart";
import { useSelector } from "react-redux";
import { Badge } from "react-native-paper";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const dispatch = useAppDispatch();
  const { cartProducts: cartProducts } = useSelector(
    (state: any) => state.cartProducts
  );
  const cartItem = useSelector((state: any) => state.user);
  const navigation: any = useNavigation();
  useEffect(() => {
    if (cartItem?.userInfo) {
      dispatch(fetchCartProducts(cartItem?.userInfo));
    }
  }, [cartItem]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ebebeb" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#883333",
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            backgroundColor: "white",
            minHeight: Platform.OS == "ios" ? 110 : 80,
            borderTopLeftRadius: route.name === "CART" ? 0 : 35,
            borderTopRightRadius: route.name === "CART" ? 0 : 35,
            ...Platform.select({
              ios: {
                shadowColor: route.name !== "CART" ? "#000" : "transparent",
                shadowOffset:
                  route.name !== "CART"
                    ? { width: 0, height: -3 }
                    : { width: 0, height: 0 },
                shadowOpacity: route.name !== "CART" ? 0.3 : 0,
                shadowRadius: route.name !== "CART" ? 3 : 0,
              },
              android: {
                elevation: route.name !== "CART" ? 21 : 0,
              },
            }),
          },
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "Inter-SemiBold",
          },
        })}
      >
        <Tab.Screen
          name="HOME"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather color={color} size={30} name={"home"} />
            ),
          }}
        />
        <Tab.Screen
          name="SHOP"
          component={ShopStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={IMAGES.SHOP}
                style={{ height: 30, width: 30, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ME"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather color={color} size={30} name={"user"} />
            ),
          }}
        />

        <Tab.Screen
          name="CART"
          component={CartStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <View style={{ position: "relative" }}>
                <Image
                  source={IMAGES.CART}
                  style={{ height: 30, width: 30, tintColor: color }}
                />
                <View style={{ position: "absolute", top: -12, right: -15 }}>
                  <Badge
                    size={22}
                    style={{ fontFamily: "Inter-Semibold", fontSize: 10 }}
                  >
                    {cartProducts?.CartItems?.length
                      ? cartProducts?.CartItems?.length
                      : 0}
                  </Badge>
                </View>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="MORE"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                  AsyncStorage.clear();
                }}
              >
                <MaterialCommunityIcons
                  color={color}
                  size={30}
                  name={"dots-horizontal-circle-outline"}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};
export default BottomTabs;
