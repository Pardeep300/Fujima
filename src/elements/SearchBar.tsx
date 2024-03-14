import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { IMAGES } from "../utilities/images";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
interface SearchBarProps {
  value: any;
  onChangeText: any;
  onSubmitEditing: any;
  style: any;
  inputStyle: any;
  placeholder: any;
  placeholderTextColor: any;
  showQR: any;
  loading: any;
  onFocus?: any;
}
const SearchBar = ({
  value,
  onChangeText,
  onSubmitEditing,
  style,
  inputStyle,
  placeholder,
  placeholderTextColor,
  showQR = true,
  loading,
  onFocus,
}: any) => {
  const navigation: any = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <View>
          <Ionicons
            name="search"
            size={32}
            color={showQR ? "gray" : "#fff"}
            style={showQR ? {} : { opacity: 0.6 }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TextInput
            style={[styles.input, inputStyle]}
            placeholder={placeholder ?? "What are you looking for?"}
            placeholderTextColor={placeholderTextColor}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onFocus={() => {
              navigation.navigate("GlobalSearch");
            }}
          />
        </View>

        {showQR ? (
          <View style={{ flexDirection: "row", gap: 10 }}>
            {loading && value.trim() !== "" ? (
              <ActivityIndicator color={'white'}></ActivityIndicator>
            ) : null}
            <Image source={IMAGES.QR} style={{ height: 30, width: 30 }} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 45,
    paddingHorizontal: 15,
    fontSize: 18,
    // color: "#484848",
    fontFamily: "Inter-Medium",
  },
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});
