import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../screens/CartScreen";

const CartStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={"CARTSCREEN"}>
      <Stack.Screen
        name="CARTSCREEN"
        component={CartScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CartStack;
