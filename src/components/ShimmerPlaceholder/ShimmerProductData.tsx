import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

interface ShimmerProductDataProps {
  style?: any;
  index?: string;
}
const ShimmerProductData: React.FC<ShimmerProductDataProps> = ({
  style = {},
  index,
}) => {
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
            minHeight: 340,
            width: 250,
            borderRadius: 20,
            paddingBottom: 20,
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 20,
            }}
          >
            <ShimmerPlaceholder
              height={30}
              width={50}
              shimmerColors={[
                "rgb(242,242,242)",
                "rgb(235,235,235)",
                "rgb(220,220,220)",
              ]}
              LinearGradient={LinearGradient}
              style={{ borderRadius: 10 }}
            />
            <ShimmerPlaceholder
              height={30}
              width={50}
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
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShimmerPlaceholder
              height={100}
              width={100}
              shimmerColors={[
                "rgb(242,242,242)",
                "rgb(235,235,235)",
                "rgb(220,220,220)",
              ]}
              LinearGradient={LinearGradient}
              style={{ borderRadius: 20 }}
            />
          </View>
          <View style={{ paddingHorizontal: 20, gap: 10, marginTop: 20 }}>
            <ShimmerPlaceholder
              height={30}
              width={200}
              shimmerColors={[
                "rgb(242,242,242)",
                "rgb(235,235,235)",
                "rgb(220,220,220)",
              ]}
              LinearGradient={LinearGradient}
              style={{ borderRadius: 10 }}
            />
            <ShimmerPlaceholder
              height={30}
              width={100}
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
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <ShimmerPlaceholder
              height={30}
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
        </View>
      )}
    ></FlatList>
    // <ScrollView horizontal={true}>
    //   <View
    //     style={{
    //       backgroundColor: "white",
    //       minHeight: 340,
    //       width: 250,
    //       borderRadius: 20,
    //       paddingBottom: 20,
    //       marginHorizontal: 20,
    //     }}
    //   >
    //     <View
    //       style={{
    //         justifyContent: "space-between",
    //         flexDirection: "row",
    //         padding: 20,
    //       }}
    //     >
    //       <ShimmerPlaceholder
    //         height={30}
    //         width={50}
    //         shimmerColors={[
    //           "rgb(242,242,242)",
    //           "rgb(235,235,235)",
    //           "rgb(220,220,220)",
    //         ]}
    //         LinearGradient={LinearGradient}
    //         style={{ borderRadius: 10 }}
    //       />
    //       <ShimmerPlaceholder
    //         height={30}
    //         width={50}
    //         shimmerColors={[
    //           "rgb(242,242,242)",
    //           "rgb(235,235,235)",
    //           "rgb(220,220,220)",
    //         ]}
    //         LinearGradient={LinearGradient}
    //         style={{ borderRadius: 10 }}
    //       />
    //     </View>
    //     <View
    //       style={{
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <ShimmerPlaceholder
    //         height={150}
    //         width={150}
    //         shimmerColors={[
    //           "rgb(242,242,242)",
    //           "rgb(235,235,235)",
    //           "rgb(220,220,220)",
    //         ]}
    //         LinearGradient={LinearGradient}
    //         style={{ borderRadius: 20 }}
    //       />
    //     </View>
    //     <View style={{ paddingHorizontal: 20, gap: 10, marginTop: 20 }}>
    //       <ShimmerPlaceholder
    //         height={50}
    //         width={200}
    //         shimmerColors={[
    //           "rgb(242,242,242)",
    //           "rgb(235,235,235)",
    //           "rgb(220,220,220)",
    //         ]}
    //         LinearGradient={LinearGradient}
    //         style={{ borderRadius: 10 }}
    //       />
    //       <ShimmerPlaceholder
    //         height={30}
    //         width={100}
    //         shimmerColors={[
    //           "rgb(242,242,242)",
    //           "rgb(235,235,235)",
    //           "rgb(220,220,220)",
    //         ]}
    //         LinearGradient={LinearGradient}
    //         style={{ borderRadius: 10 }}
    //       />
    //     </View>
    //     <View
    //       style={{
    //         justifyContent: "center",
    //         alignItems: "center",
    //         marginTop: 20,
    //       }}
    //     >
    //       <ShimmerPlaceholder
    //         height={50}
    //         width={200}
    //         shimmerColors={[
    //           "rgb(242,242,242)",
    //           "rgb(235,235,235)",
    //           "rgb(220,220,220)",
    //         ]}
    //         LinearGradient={LinearGradient}
    //         style={{ borderRadius: 10 }}
    //       />
    //     </View>
    //   </View>
    // </ScrollView>
  );
};

export default ShimmerProductData;
