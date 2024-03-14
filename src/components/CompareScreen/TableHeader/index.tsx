import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import theme from "../../../config/theme";

const TableHeader = ({ loading }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Fontisto color={"#CDCDCD"} size={30} name={"arrow-swap"} />
      </View>
      <View>
        <View style={styles.row}>
          <Text style={styles.head_color}>Price: </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.head_color}>UPC Code </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.head_color}>Brand </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.head_color}>Category </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.head_color}>Sub Category 1 </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.head_color}>Sub Category 2 </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.head_color}>Weight </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.head_color}>Color </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.head_color}>Dimensions </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 220,
    minWidth: 100,
    width: Dimensions.get("screen").width / 2.5,
    borderRightColor: theme.colors.borderGray1,
    borderRightWidth: 1,
    paddingVertical: 20,
  },
  head: {
    justifyContent: "center",
    alignItems: "center",
    height: 230,
    width: "100%",
    borderBottomColor: theme.colors.borderGray1,
    borderBottomWidth: 1,
  },
  row: {
    borderBottomColor: theme.colors.borderGray1,
    borderBottomWidth: 1,
    height: 45,
    justifyContent: 'center',
    paddingLeft: 18
  },
  head_color: {
    color: theme.colors.arrowGray,
    fontSize: 18,
    fontWeight: "500",
  },
});

export default TableHeader;
