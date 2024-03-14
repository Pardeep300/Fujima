import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text } from "react-native-paper";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useSelector } from "react-redux";
import { addItem } from "../../redux/reducers/comparedSlice";
import { useAppDispatch } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";

const ComparisonButton = () => {
  const navigation: any = useNavigation();
  const { comparedItem: comparedItem } = useSelector(
    (state: any) => state.comparedItems
  );
  const parseItem = JSON.parse(comparedItem);
  const prodCodesAndUomCodes = parseItem.map((item: any) => ({
    ProdCode: item.ProdCode,
    UomCode: item.DisplayUOM,
  }));
  return (
    <TouchableOpacity
      onPress={() => {
        // AsyncStorage.removeItem("comparedItems");
        // dispatch(addItem(null));
        navigation.navigate("ComparisonScreen", {
          comparedItem: prodCodesAndUomCodes,
        });
      }}
    >
      <LinearGradient
        colors={["#d32221", "#b0292a"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          paddingHorizontal: 8,
          paddingVertical: 12,
          alignItems: "center",
          flexDirection: "row",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 0,
          marginVertical: 10,
        }}
      >
        <Fontisto color={"white"} size={25} name={"arrow-swap"} />
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontFamily: "Inter-Bold",
            marginLeft: 10,
          }}
        >
          {parseItem?.length ?? 0}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ComparisonButton;
