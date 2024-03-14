import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
const StepIndicator = ({
  steps,
  currentIndex,
  handlePress,
  setCurrentIndex,
}: any) => {
  const data = steps;

  const handleStepPress = (index: number) => {
    handlePress(index);
  };
  const windowWidth = useWindowDimensions().width;
  const stepWidth = 300 / data.length;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {data.map((item: any, index: any) => {
          return (
            <View key={index}>
              <TouchableOpacity
                key={index}
                onPress={() => handleStepPress(index)}
              >
                <View
                  key={index}
                  style={[
                    styles.step,
                    {
                      backgroundColor:
                        index === currentIndex ? "#883333" : "#ccc",
                      height: index === currentIndex ? 15 : 7,
                      marginTop: index === currentIndex ? 10 : 13,
                      width: stepWidth,
                    },
                  ]}
                ></View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 10,
          flexDirection: "row",
        }}
      >
        <Text
          style={{ fontSize: 23, fontFamily: "Inter-Medium", color: "#666666" }}
        >
          {"<"}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#666666",
            fontFamily: "Inter-Bold",
            textAlign: "center",
            marginTop:3
          }}
        >
          {currentIndex + 1}/{data.length}
        </Text>
        <Text
          style={{ fontSize: 23, fontFamily: "Inter-Medium", color: "#666666" }}
        >
          {">"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -55,
  },
  step: {
    width: 100,
    height: 10,

    // borderRadius: ,
  },
});

export default StepIndicator;
