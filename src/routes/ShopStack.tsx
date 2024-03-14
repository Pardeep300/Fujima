import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShopScreen from "../screens/ShopScreen";
import ShopSubCategories from "../components/ShopScreen/ShopSubCategories";

const ShopStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={"SHOP"}>
      <Stack.Screen
        name="SHOP"
        component={ShopScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShopSubCategories"
        component={ShopSubCategories}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ShopStack;
