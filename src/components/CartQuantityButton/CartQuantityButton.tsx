import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const CartQuantityButton = ({
  quantity,
  setQuantity,
  style,
  textStyles,
}: {
  quantity: any;
  setQuantity: any;
  style?: any;
  textStyles?: any;
}) => {
  return (
    <View style={[styles.container, style]}>
      <View>
      <TouchableOpacity
          onPress={() => {
            if (quantity > 0) {
              setQuantity(quantity - 1);
            }
          }}
          style={{ marginLeft: 10 }}
        >
          <Entypo name="minus" size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "white", borderRadius: 20 }}>
        <Text style={[styles.quantityText, textStyles]}>{quantity}</Text>
      </View>
      <View>
       
        <TouchableOpacity
          onPress={() => setQuantity(quantity + 1)}
          style={{ marginRight: 10 }}
        >
          <Entypo name="plus" size={25} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DBDDDF",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    justifyContent: "space-between",
    marginTop: 8,
  },
  quantityText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    marginVertical: 5,
    marginHorizontal: 20,
    color: "black",
  },
});

export default CartQuantityButton;
