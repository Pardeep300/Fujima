import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { IMAGES } from "../utilities/images";
interface FileUploaderProps {
  handlePickUp: () => Promise<void>;
}
const FileUploader: React.FC<FileUploaderProps> = ({ handlePickUp }) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handlePickUp()}>
          <View
            style={{
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Image source={IMAGES.UPLOAD_FILE}></Image>
            </View>
            <View
              style={{
                position: "absolute",
                flexDirection: "row",
              }}
            >
              <View style={{ marginRight: 20 }}>
                <Image source={IMAGES.CLOUD}></Image>
              </View>
              <View>
                <Text style={{ fontSize: 18, fontFamily: "Inter-Bold",color:'black' }}>
                   Browser
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter-Regular",
                    color: "#676767",
                  }}
                >
                  Supported formats: JPEG,PNG,PDF
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 13,
          fontFamily: "Inter-Medium",
          color: "#F29035",
          marginTop: 10,
        }}
      >
        Note: Max 10 files can be uploaded | Upto 4 MB
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dropZone: {
    width: "80%",
    height: 200,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  dropText: {
    fontSize: 16,
    color: "#666",
  },
});

export default FileUploader;
