import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGES } from "../utilities/images";
import DocumentPicker from "react-native-document-picker";
import UserDetails from "../components/signUp/UserDetail";
import ContactDetails from "../components/signUp/ContactDetail";
import AntDesign from "react-native-vector-icons/AntDesign";
import { signUpUser, validateAddress } from "../redux/actions/auth";
import { useAppDispatch } from "../redux/store";
import { ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import CommonModal from "../components/modal/CommonModal";
import { showMessage } from "react-native-flash-message";

const SignUpScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    FullName: "",
    Position: "",
    CompanyName: "",
    TaxId: "",
    PhoneNumber: "",
    ResellerTaxId: "",
    Documents: [
      {
        uri: "",
        type: "",
        name: "",
      },
    ],
    FaxNumber: "",
    StreetAddress: "",
    Country: "USA",
    City: "",
    State: "",
    ZipCode: "",
    Email: "",
    PreferredPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [userDetail, setUserDetail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const handlePickUp = async () => {
    try {
      const res: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });
      setFormData({ ...formData, Documents: res });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        console.log("Error while picking the file", err);
      }
    }
  };

  const handleDeleteFile = (index: any) => {
    const updatedList = [...formData.Documents];
    updatedList.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      Documents: updatedList,
    }));
  };
  const userDetailsValidateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      companyName: "",
      federalTaxId: "",
      resellarTaxId: "",
      uploadResellarTaxId: "",
    };

    if (formData.FullName.trim() == "") {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }
    if (formData.CompanyName.trim() == "") {
      newErrors.companyName = "Company Name is required";
      isValid = false;
    }

    if (formData.ResellerTaxId.trim() == "") {
      newErrors.resellarTaxId = "Reseller Tax ID is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const contactDetailValidateForm = () => {
    let isValid = true;
    const newErrors = {
      phoneNumber: "",
      streetAddress: "",
      country: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      password: "",
    };

    if (formData.PhoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone Number is required";
      isValid = false;
    } else if (
      !/^(\(?([0-9]{3})\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
        formData.PhoneNumber.trim()
      )
    ) {
      newErrors.phoneNumber = "Invalid Phone Number";
      isValid = false;
    }

    if (formData.StreetAddress.trim() === "") {
      newErrors.streetAddress = "Street Address is required";
      isValid = false;
    }

    if (formData.Country.trim() === "") {
      newErrors.country = "Country is required";
      isValid = false;
    }

    if (formData.City.trim() === "") {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (formData.State.trim() === "") {
      newErrors.state = "State is required";
      isValid = false;
    }

    if (formData.ZipCode.trim() === "") {
      newErrors.zip = "ZIP Code is required";
      isValid = false;
    }

    if (formData.Email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (formData.PreferredPassword.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (userDetailsValidateForm()) {
      setUserDetail(false);
    }
  };

  const addressValidate = {
    address: {
      regionCode: "US",
      locality: formData.City,
      addressLines: [formData.StreetAddress],
      postalCode: formData.ZipCode,
      administrativeArea: formData.State,
    },
  };

  const handleSubmit = async () => {
    if (contactDetailValidateForm()) {
      setLoading(true);
      const res = await dispatch(validateAddress(addressValidate));
      const addressResponse = res.payload.result.address.addressComponents;
      let postalCodeConfirm = addressResponse.find(
        (item: any) => item.componentType == "postal_code"
      );
      let stateConfirm = addressResponse.find(
        (item: any) => item.componentType == "administrative_area_level_1"
      );

      let streetAddress = addressResponse.find(
        (item: any) => item.componentType == "street_number"
      );
      if (streetAddress == undefined) {
        streetAddress = "UNCONFIRMED";
      }
      let routeConfirm = addressResponse.find(
        (item: any) => item.componentType == "route"
      );
      if (routeConfirm == undefined) {
        routeConfirm = "UNCONFIRMED";
      }
      let cityConfirm = addressResponse.find(
        (item: any) => item.componentType == "locality"
      );
      if (cityConfirm == undefined) {
        cityConfirm = {};
        cityConfirm.confirmationLevel = "CONFIRMED";
      }
      let neighborhoodConfirm = addressResponse.find(
        (item: any) => item.componentType == "neighborhood"
      );
      if (neighborhoodConfirm == undefined) {
        neighborhoodConfirm = {};
        neighborhoodConfirm.confirmationLevel = "CONFIRMED";
      }
      let subPremiseConfirm = addressResponse.find(
        (item: any) => item.componentType == "subpremise"
      );
      if (subPremiseConfirm == undefined) {
        subPremiseConfirm = {};
        subPremiseConfirm.confirmationLevel = "CONFIRMED";
      }

      let pointOfInterest = addressResponse.find(
        (item: any) => item.componentType == "point_of_interest"
      );
      if (pointOfInterest == undefined) {
        pointOfInterest = {};
        pointOfInterest.confirmationLevel = "CONFIRMED";
      }

      if (
        postalCodeConfirm?.confirmationLevel == "CONFIRMED" &&
        stateConfirm?.confirmationLevel == "CONFIRMED" &&
        streetAddress?.confirmationLevel == "CONFIRMED" &&
        routeConfirm?.confirmationLevel == "CONFIRMED" &&
        cityConfirm?.confirmationLevel == "CONFIRMED" &&
        subPremiseConfirm?.confirmationLevel == "CONFIRMED" &&
        pointOfInterest?.confirmationLevel == "CONFIRMED"
      ) {
        const formData1 = new FormData();
        for (var key in formData) {
          if (formData.hasOwnProperty(key)) {
            // @ts-ignore
            formData1.append(key, formData[key]);
          }
        }
        const res: any = await dispatch(signUpUser(formData1));
        if (res?.payload.responseCode == 200) {
          setLoading(false);
          setIsVisible(true);
        } else {
          setLoading(false);
          showMessage({
            message: res.payload.message,
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
      } else {
        setLoading(false);
        if (postalCodeConfirm?.confirmationLevel !== "CONFIRMED") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            zip: "Please enter the valid zip code",
          }));
        }
        if (stateConfirm?.confirmationLevel !== "CONFIRMED") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            state: "Please enter the valid state",
          }));
        }
        if (streetAddress?.confirmationLevel !== "CONFIRMED") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            streetAddress: "Please enter the valid street address",
          }));
        }
        if (routeConfirm?.confirmationLevel !== "CONFIRMED") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            streetAddress: "Please enter the valid street address",
          }));
        }
        if (cityConfirm?.confirmationLevel !== "CONFIRMED") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            city: "Please enter the valid city",
          }));
        }
        if (subPremiseConfirm?.confirmationLevel !== "CONFIRMED") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            streetAddress: "Please enter the valid street address",
          }));
        }
        if (pointOfInterest?.confirmationLevel !== "CONFIRMED") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            streetAddress: "Please enter the valid street address",
          }));
        }
      }
    }
  };
  const closeModal = () => {
    setIsVisible(false);
    navigation.navigate("Login");
    setFormData({
      FullName: "",
      Position: "",
      CompanyName: "",
      TaxId: "",
      PhoneNumber: "",
      ResellerTaxId: "",
      Documents: [
        {
          uri: "",
          type: "",
          name: "",
        },
      ],
      FaxNumber: "",
      StreetAddress: "",
      Country: "USA",
      City: "",
      State: "",
      ZipCode: "",
      Email: "",
      PreferredPassword: "",
    });
  };

  return (
    <><StatusBar translucent backgroundColor="transparent" barStyle={"dark-content"} /><SafeAreaView style={{ flex: 1 }}>
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
      <CommonModal
        visible={isVisible}
        title={"Thank you"}
        description={"Thank you! We will reach out to you once your account has been verified."}
        image={IMAGES.VERIFY}
        closeModal={closeModal}
      ></CommonModal>
      <View style={styles.header}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => userDetail ? navigation.pop() : setUserDetail(true)}
            >
              <AntDesign color={"black"} size={35} name={"left"} />
            </TouchableOpacity>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.account}>Create Your Account</Text>
              {userDetail ? (
                <Text style={styles.user}>User Detail</Text>
              ) : (
                <Text style={styles.user}>Contact Detail</Text>
              )}
            </View>
          </View>
          <View>
            <View>
              <Image
                source={userDetail ? IMAGES.USER_DETAIL : IMAGES.CONTACT_DETAIL}
              ></Image>
            </View>
          </View>
        </View>
      </View>
      {userDetail ? (
        <UserDetails
          formData={formData}
          setFormData={setFormData}
          handlePickUp={handlePickUp}
          handleDeleteFile={handleDeleteFile}
          setUserDetail={setUserDetail}
          errors={errors}
          handleNext={handleNext}
          setErrors={setErrors}
        ></UserDetails>
      ) : (
        <ContactDetails
          formData={formData}
          setFormData={setFormData}
          setUserDetail={setUserDetail}
          handleSubmit={handleSubmit}
          setErrors={setErrors}
          errors={errors}
        ></ContactDetails>
      )}
    </SafeAreaView></>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  account: {
    fontSize: 20,
    color: "#393939",
    fontFamily: "Inter-Bold",
  },
  user: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: "#A7A7A7",
  },
  header: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  input: {
    color: "black",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    marginBottom: 13,
  },
  selectedFileContainer: {
    marginTop: 15,
    borderColor: "#41BF22",
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
