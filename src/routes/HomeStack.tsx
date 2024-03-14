import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductList from "../screens/ProductList";
import BrandListScreen from "../screens/BrandListScreen";
import GlobalSearchScreen from "../screens/GlobalSearchScreen";
import ComparisonScreen from "../screens/ComparisonScreen";
import ShopSubCategories from "../components/ShopScreen/ShopSubCategories";

const HomeStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={"HOME"}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BrandList"
        component={BrandListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GlobalSearch"
        component={GlobalSearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComparisonScreen"
        component={ComparisonScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
