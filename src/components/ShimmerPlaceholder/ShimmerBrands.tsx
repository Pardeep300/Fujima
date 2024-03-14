import React from "react";
import { FlatList, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const ShimmerBrands = () => {
  const data = ["", "", "", "", "", "", "", ""];
  return (
    <FlatList
      style={{
        paddingHorizontal: 20,
        marginRight: 10,
        paddingRight: 10,
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={(item) => (
        <View
          style={{
            backgroundColor: "white",
            height: 80,
            width: 150,
            borderRadius: 20,
            paddingBottom: 20,
            marginHorizontal: 20,
            marginTop:20
          }}
        >
          <ShimmerPlaceholder
            height={80}
            width={150}
            shimmerColors={[
              "rgb(250,250,250)",
              "rgb(230,230,230)",
              "rgb(255,255,255)",
            ]}
            LinearGradient={LinearGradient}
            style={{ borderRadius: 10 }}
          />
        </View>
      )}
    ></FlatList>
  );
};

export default ShimmerBrands;
