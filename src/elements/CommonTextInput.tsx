import React, { useState } from "react";
import { TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface CommonTextInputProps {
  value: any;
  onChangeText: any;
  placeholder?: any;
  secureTextEntry?: any;
  style?: any;
  editable?: any;
  inputStyles?:any
}

const CommonTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
  editable,
  inputStyles
}: any) => {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input,inputStyles]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        secureTextEntry={secureTextEntry && hidePassword}
        editable={editable}
        autoCapitalize="none"
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eye}
          onPress={() => setHidePassword(!hidePassword)}
        >
          {hidePassword ? (
            <Ionicons name="eye-off" size={25} color="black" />
          ) : (
            <Ionicons name="eye" size={25} color="black" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 55,
    borderColor: "#B6B6B6",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: "600",
    color: "#484848",
  },
  eye: {
    position: "absolute",
    top: 17,
    right: 15,
  },
});

export default CommonTextInput;
