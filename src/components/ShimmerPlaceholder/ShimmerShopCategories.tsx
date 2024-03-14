import React from "react";
import { ScrollView, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const ShimmerShopCategories = () => {
  const data = ["", "", "", "", "", ""];
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <ShimmerPlaceholder
          height={200}
          width={400}
          shimmerColors={[
            "rgb(242,242,242)",
            "rgb(235,235,235)",
            "rgb(220,220,220)",
          ]}
          LinearGradient={LinearGradient}
          style={{ borderRadius: 10 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginBottom: 15,
        }}
      >
        {data.map((item) => (
          <View style={{ paddingVertical: 20 }}>
            <ShimmerPlaceholder
              height={200}
              width={200}
              shimmerColors={[
                "rgb(242,242,242)",
                "rgb(235,235,235)",
                "rgb(220,220,220)",
              ]}
              LinearGradient={LinearGradient}
              style={{ borderRadius: 10 }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ShimmerShopCategories;
