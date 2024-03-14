import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPassword from "../screens/ForgotPassword";
import BottomTabs from "./BottomTab";
import HomeScreen from "../screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApparelScreen from "../screens/ApparelScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ClearanceList from "../screens/ProductList";
import { addItem } from "../redux/reducers/comparedSlice";
import { useAppDispatch } from "../redux/store";
import { fetchUserInfo } from "../redux/actions/auth";
import { fetchCartProducts } from "../redux/actions/addCart";
import { useSelector } from "react-redux";

const RootStack = () => {
  const Stack = createStackNavigator();
  const [token, setToken] = useState("");
  const dispatch = useAppDispatch();

  const [tokenLoaded, setTokenLoaded] = useState(false);
  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken !== null && storedToken !== undefined) {
        setToken(storedToken);
      } else {
        console.log("Token does not exist");
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    } finally {
      setTokenLoaded(true);
    }
  };
  const comparedItem = async () => {
    const comparedProducts: any = await AsyncStorage.getItem("comparedItems");
    dispatch(addItem(comparedProducts));
  };
  useEffect(() => {
    getToken();
    comparedItem();
    setTimeout(async () => {
      await dispatch(fetchUserInfo());
    });
  }, []);

  if (!tokenLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? "MainTabs" : "Login"}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Apparel"
          component={ApparelScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
