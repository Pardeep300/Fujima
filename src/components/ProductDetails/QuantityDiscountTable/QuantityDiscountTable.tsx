import React from "react";
import { ScrollView, Text, View } from "react-native";

const QuantiyDiscountTable = ({ productData }: any) => {
  return productData?.QuantityDiscounts &&
    productData?.QuantityDiscounts?.length ? (
    <ScrollView>
      <Text
        style={{
          color: "#1F1F1F",
          fontFamily: "Inter-ExtraBold",
          fontSize: 18,
          marginBottom: 20,
        }}
      >
        Quantity Discount
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
        <View style={{ width: "30%" }}>
          <View>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 14,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Product Code
            </Text>
          </View>
          {productData?.QuantityDiscounts?.map((item: any, index: any) => {
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
                  {item?.ProdCode}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{ width: "25%" }}>
          <View>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 14,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              UOM Code
            </Text>
          </View>
          {productData?.QuantityDiscounts?.map((item: any, index: any) => {
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
        <View style={{ width: "22.5%" }}>
          <View>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 14,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Quantity
            </Text>
          </View>
          {productData?.QuantityDiscounts?.map((item: any, index: any) => {
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
                  {item?.DiscountQuantity ?? 0}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{ width: "22.5%" }}>
          <View>
            <Text
              style={{
                fontFamily: "Inter-Bold",
                fontSize: 14,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Discount
            </Text>
          </View>
          {productData?.QuantityDiscounts?.map((item: any, index: any) => {
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
                  {item?.Discount}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  ) : null;
};

export default QuantiyDiscountTable;
