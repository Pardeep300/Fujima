import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const SmallButton = ({
  title,
  onPress,
  style,
  textStyle,
}: {
  title: any;
  onPress: any;
  style?: any;
  textStyle?: any;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SmallButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#883333",
    width: 120,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    color: "green",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
});
