import React from "react";
import { FlatList, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const ShimmerCartDetails = () => {
  const data = ["","","","","",""];
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={(item) => (
        <View
          style={{
            backgroundColor: "white",
            height: 200,
            width: 400,
            borderRadius: 20,
            // paddingBottom: 20,
            marginBottom:20,
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              // justifyContent: "space-between",
              flexDirection: "row",
              padding: 20,
            }}
          >
            <View>
              <ShimmerPlaceholder
                height={80}
                width={80}
                shimmerColors={[
                  "rgb(242,242,242)",
                  "rgb(235,235,235)",
                  "rgb(220,220,220)",
                ]}
                LinearGradient={LinearGradient}
                style={{ borderRadius: 10 }}
              />
            </View>

            <View style={{ marginLeft: 10, flex: 1, gap: 10 }}>
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
                width={200}
                shimmerColors={[
                  "rgb(242,242,242)",
                  "rgb(235,235,235)",
                  "rgb(220,220,220)",
                ]}
                LinearGradient={LinearGradient}
                style={{ borderRadius: 10 }}
              />
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
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
            </View>
          </View>
          <View style={{ borderWidth: 1, borderColor: "#DEDEDE" }}></View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <ShimmerPlaceholder
              height={30}
              width={80}
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
              width={80}
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
              width={80}
              shimmerColors={[
                "rgb(242,242,242)",
                "rgb(235,235,235)",
                "rgb(220,220,220)",
              ]}
              LinearGradient={LinearGradient}
              style={{ borderRadius: 10 }}
            />
          </View>
          {/* <View
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
            </View> */}
          {/* <View style={{ paddingHorizontal: 20, gap: 10, marginTop: 20 }}>
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
            </View> */}
          {/* <View
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
            </View> */}
        </View>
      )}
    ></FlatList>
  );
};

export default ShimmerCartDetails;
