import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../utilities/images";
import CommonTextInput from "../elements/CommonTextInput";
import LargeButton from "../elements/LargeButton";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch } from "../redux/store";
import { userForgotPassword } from "../redux/actions/auth";
import { showMessage } from "react-native-flash-message";
import Ionicons from "react-native-vector-icons/Ionicons";

const ForgotPassword = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    Email: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [error, setErrors]: any = useState({});
  const [loading, setLoading] = useState(false);

  const forgotValidation = () => {
    let isValid = true;
    const newErrors = {
      Email: "",
    };
    if (formData.Email.trim() === "") {
      newErrors.Email = "Email is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleForgotPassword = async () => {
    if (forgotValidation()) {
      setLoading(true);
      await dispatch(userForgotPassword(formData))
        .then((response: any) => {
          if (response.payload.responseCode == 200) {
            setLoading(false);
            setIsVisible(true);
          } else {
            setLoading(false);
            showMessage({
              message: response.payload.message,
              titleStyle: {
                fontFamily: "Inter-SemiBold",
                fontSize: 16,
                color: "white",
              },
              floating: true,
              duration: 4000,
              style: {
                backgroundColor: "#883333",
                width: "90%",
                padding: 25,
                borderRadius: 10,
                alignSelf: "center",
              },
            });
          }
        })
        .catch((err: any) => {
          setLoading(false);
          console.log("Error during the forgot Password", err);
        });
      Keyboard.dismiss();
    }
  };
  const closeModal = () => {
    setIsVisible(false);
    navigation.navigate("Login")
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <KeyboardAvoidingView
        style={{ justifyContent: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Modal
          animationType="fade"
          transparent={true}
          visible={loading}
          onRequestClose={() => setLoading(false)}
        >
          <View style={styles.modalBackground}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        </Modal>
        <ScrollView keyboardShouldPersistTaps="always">
          <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Ionicons
                  name="mail-open-outline"
                  size={60}
                  color="#2478A8"
                  style={styles.modalImage}
                />
                <Text style={styles.modalText}>
                  {"Please check your Registered email to reset your password"}
                </Text>
                {/* <Text style={styles.modalText}>{description}</Text> */}
                <TouchableOpacity
                  onPress={() => closeModal()}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View>
            <View style={styles.content}>
              <Image source={IMAGES.FUJIMA_LOGO} style={styles.logo} />
              <Text style={styles.signInText}>Forgot Password</Text>
              <Text style={styles.signInDescription}>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum
              </Text>
            </View>
            <View style={{ marginTop: 50, paddingHorizontal: 35 }}>
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.userName}>Username</Text>
                <CommonTextInput
                  value={formData.Email}
                  onChangeText={(value: any) => {
                    setFormData({ ...formData, Email: value });
                    setErrors({ ...error, Email: "" });
                  }}
                  placeholder="Username"
                  placeholderTextColor="#A0A0A0"
                  style={{ marginBottom: 10 }}
                />
                {error?.Email && (
                  <Text style={styles.error}>{error?.Email}</Text>
                )}
              </View>
            </View>
            <View style={{ marginHorizontal: 45 }}>
              <LargeButton
                title="Submit"
                onPress={() => handleForgotPassword()}
              />
            </View>
            <View style={{ marginTop: 50 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.account}>Back to login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ForgotPassword;

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
  logo: {
    marginBottom: 30,
  },
  signInText: {
    fontSize: 32,
    color: "#883333",
    fontWeight: "600",
    lineHeight: 40,
    marginBottom: 20,
  },
  signInDescription: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    textAlign: "center",
    color: "#61677D",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#484848",
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
  forgot: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7C8BA0",
    textAlign: "right",
  },
  account: {
    fontSize: 20,
    fontWeight: "500",
    color: "#3B4054",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontFamily: "Inter-Medium",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    paddingHorizontal: 50,
    paddingVertical: 30,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 20,
  },
  modalImage: {
    // width: 80,
    // height: 80,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    marginBottom: 10,
    color: "#1C1C1C",
    textAlign: "center",
    lineHeight: 25,
  },
  modalTitleText: {
    fontSize: 25,
    fontFamily: "Inter-SemiBold",
    marginBottom: 10,
    color: "#1C1C1C",
    textAlign: "center",
    lineHeight: 25,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#883333",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
