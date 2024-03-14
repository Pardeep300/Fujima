import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { IMAGES } from "../utilities/images";
import LargeButton from "../elements/LargeButton";
import CommonTextInput from "../elements/CommonTextInput";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch } from "../redux/store";
import { signInUser } from "../redux/actions/auth";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [errors, setErrors]: any = useState({});
  const loginValidation = () => {
    let isValid = true;
    const newErrors = {
      Email: "",
      Password: "",
    };
    if (formData.Email.trim() === "") {
      newErrors.Email = "Email is required";
      isValid = false;
    } 
    if (formData.Password.trim() == "") {
      newErrors.Password = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: any) => state.user);
  const handleLogin = async () => {
    if (loginValidation()) {
      setLoading(true);
      Keyboard.dismiss();
      await dispatch(signInUser(formData))
        .then((response: any) => {
          if (
            response.payload.authentication.responseCode == 200 &&
            response.payload.token
          ) {
            AsyncStorage.setItem("userInfo", JSON.stringify(response.payload));
            AsyncStorage.setItem("token", response.payload.token);
            setLoading(false);
            setFormData({
              Email: "",
              Password: "",
            });
            navigation.navigate("MainTabs");
          } else {
            setLoading(false);
            showMessage({
              message: response.payload.authentication.message,
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
          console.log("Error occuring during login", err);
        });
    }
  };

  return (
    <><StatusBar translucent backgroundColor="transparent" barStyle={"dark-content"} /><SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
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
      <KeyboardAvoidingView
        style={{ justifyContent: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="always"
        >
          <View>
            <View style={styles.content}>
              <Image source={IMAGES.FUJIMA_LOGO} style={styles.logo} />
              <Text style={styles.signInText}>Sign In</Text>
              <Text style={styles.signInDescription}>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum
              </Text>
            </View>
            <View style={{ marginTop: 50, paddingHorizontal: 35 }}>
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.userName}>Username or Email Address</Text>
                <CommonTextInput
                  value={formData.Email}
                  onChangeText={(value: any) => {
                    setFormData({ ...formData, Email: value });
                    setErrors({ ...errors, Email: "" });
                  } }
                  placeholder="Username or Email Id"
                  placeholderTextColor="#A0A0A0"
                  style={{ marginBottom: 10 }} />
                {errors?.Email && (
                  <Text style={styles.error}>{errors?.Email}</Text>
                )}
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.userName}>Password</Text>
                <CommonTextInput
                  value={formData.Password}
                  onChangeText={(value: any) => {
                    setFormData({ ...formData, Password: value });
                    setErrors({ ...errors, Password: "" });
                  } }
                  placeholder="Password"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry={hidePassword}
                  image={IMAGES.EYE}
                  style={{ marginBottom: 10 }} />
                {errors?.Password && (
                  <Text style={styles.error}>{errors?.Password}</Text>
                )}
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginHorizontal: 45 }}>
              <LargeButton title="Log In" onPress={() => handleLogin()} />
            </View>
            <View style={{ marginTop: 50 }}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.account}>
                  Don't have account?{" "}
                  <Text style={{ color: "#883333" }}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView></>
  );
};

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
});

export default LoginScreen;
