import React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const ComparisonTable = ({ data,loading }: any) => {
  return (
    <ScrollView style={styles.mainContainer}>
      <ScrollView horizontal={true} style={styles.container}>
        <TableHeader data={data} loading={loading} />
        <TableBody data={data} loading={loading} />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get("screen").height,
    backgroundColor: "white",
    paddingRight: 20,
  },
  container: {
    flexDirection: "row",
    flex: 1,
  },
});

export default ComparisonTable;
