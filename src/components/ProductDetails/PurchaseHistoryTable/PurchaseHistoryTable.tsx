import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const PurchaseHistoryTable = ({ productData }: any) => {
  return productData?.PurchaseHistory && productData?.PurchaseHistory.length >0 ? (
    <View>
      <Text
        style={{
          color: "#1F1F1F",
          fontFamily: "Inter-ExtraBold",
          fontSize: 18,
          marginBottom: 20,
        }}
      >
        Purchase History
      </Text>
      <ScrollView horizontal={true} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.column}>
            <Text style={styles.header}>Order Date</Text>
            {productData?.PurchaseHistory?.map((item: any, index: any) => {
              var date = new Date(item?.OrderDate);

              var monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];

              var month = monthNames[date.getMonth()];
              var day = date.getDate();
              var year = date.getFullYear();

              var formattedDate = month + " " + day + ", " + year;

              return (
                <View key={index} style={styles.item}>
                  <Text style={styles.text}>{formattedDate}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.column}>
            <Text style={styles.header}>Invoice</Text>
            {productData?.PurchaseHistory?.map((item: any, index: any) => {
              return (
                <View key={index} style={styles.item}>
                  <Text style={styles.text}>{item?.InvoiceNumber}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.column}>
            <Text style={styles.header}>Invoice Date</Text>
            {productData?.PurchaseHistory?.map((item: any, index: any) => {
              var date = new Date(item?.InvoiceDate);

              var monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];

              var month = monthNames[date.getMonth()];
              var day = date.getDate();
              var year = date.getFullYear();

              var formattedDate = month + " " + day + ", " + year;

              return (
                <View key={index} style={styles.item}>
                  <Text style={styles.text}>{formattedDate}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.column}>
            <Text style={styles.header}>PO#</Text>
            {productData?.PurchaseHistory?.map((item: any, index: any) => {
              return (
                <View key={index} style={styles.item}>
                  <Text style={styles.text}>
                    {item?.PoNumber ? item?.PoNumber : "\u00A0"}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.column}>
            <Text style={styles.header}>Quantity</Text>
            {productData?.PurchaseHistory?.map((item: any, index: any) => {
              return (
                <View key={index} style={styles.item}>
                  <Text style={styles.text}>{item?.Quantity}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#D5DEE7",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    flex: 1,
    minWidth: 120,
  },
  header: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    color: "#1F1F1F",
  },
  item: {
    borderTopWidth: 2,
    borderTopColor: "#D5DEE7",
    paddingTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  text: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#8D8D8D",
    textAlign: "center",
  },
});

export default PurchaseHistoryTable;
