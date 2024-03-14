import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Platform } from 'react-native';

const PriceTable = ({ productData }: any) => {
  return productData?.UOMCodes && productData?.UOMCodes.length ? (
    <ScrollView style={{ marginVertical: 20 }}>
      <Text
        style={{
          color: "#1F1F1F",
          fontFamily: "Inter-ExtraBold",
          fontSize: 18,
          marginBottom: 20,
        }}
      >
        Price
      </Text>
      <View
        style={{
          borderColor: "#D5DEE7",
          borderWidth: 2,
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "stretch",
          
        }}
      >
        <View style={{ width:Platform.OS=== "android"?"20%" :"15%" }}>
          <View>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 14,
                marginBottom: 10,
                textAlign: "center",
                color:'black'
              }}
            >
              Unit
            </Text>
          </View>
          {productData?.UOMCodes?.map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={{
                  borderTopWidth: 2,
                  borderTopColor: "#D5DEE7",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter-SemiBold",
                    fontSize: 14,
                    color: "#8D8D8D",
                    paddingTop: 10,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {item?.UOMCode}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{ width: "30%" }}>
          <View>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 14,
                marginBottom: 10,
                textAlign: "center",
                color:'black'
              }}
            >
              UOM Quantity
            </Text>
          </View>
          {productData?.UOMCodes?.map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={{
                  borderTopWidth: 2,
                  borderTopColor: "#D5DEE7",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter-SemiBold",
                    fontSize: 14,
                    color: "#8D8D8D",
                    paddingTop: 10,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {item?.UOMQuantity}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{ width: "15%" }}>
          <View>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 14,
                marginBottom: 10,
                textAlign: "center",
                color:'black'
              }}
            >
              Price
            </Text>
          </View>
          {productData?.UOMCodes?.map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={{
                  borderTopWidth: 2,
                  borderTopColor: "#D5DEE7",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter-SemiBold",
                    fontSize: 14,
                    color: "#8D8D8D",
                    paddingTop: 10,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  ${item?.Price}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{ width: "40%" }}>
          <View>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 14,
                marginBottom: 10,
                textAlign: "center",
                color:'black'
              }}
            >
              Quantity on Order
            </Text>
          </View>
          {productData?.UOMCodes?.map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={{
                  borderTopWidth: 2,
                  borderTopColor: "#D5DEE7",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter-SemiBold",
                    fontSize: 14,
                    color: "#8D8D8D",
                    paddingTop: 10,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {item?.QuantityOnOrder}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  ) : null;
};

export default PriceTable;
