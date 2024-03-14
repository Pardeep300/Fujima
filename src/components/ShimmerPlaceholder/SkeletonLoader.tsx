import React from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const SkeletonLoader = ({ height, width }: { height?: any; width?: any }) => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder
        height={height}
        width={width}
        shimmerColors={[
          "rgb(242,242,242)",
          "rgb(235,235,235)",
          "rgb(220,220,220)",
        ]}
        LinearGradient={LinearGradient}
        style={{borderRadius:10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  shimmer: {
    height: 20,
    width: "100%",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#d4d4d4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default SkeletonLoader;
