import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CommonTextInput from "../../elements/CommonTextInput";
import SmallButton from "../../elements/SmallButton";
import { Dropdown } from "react-native-element-dropdown";
import { USACountries } from "../../utilities/state";
import AntDesign from "react-native-vector-icons/AntDesign";
interface ContactDetailProps {
  formData: any;
  setFormData: any;
  setUserDetail: any;
  handleSubmit: any;
  setErrors: any;
  errors: any;
}
const ContactDetails: React.FC<ContactDetailProps> = ({
  formData,
  setFormData,
  setUserDetail,
  handleSubmit,
  setErrors,
  errors,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const states = USACountries;
  return (
    <>
      <ScrollView>
        <View style={{ margin: 35 }}>
          <View>
            <Text style={styles.input}>Phone Number</Text>
            <CommonTextInput
              value={formData.PhoneNumber}
              onChangeText={(value: any) => {
                setFormData({ ...formData, PhoneNumber: value });
                setErrors({ ...errors, phoneNumber: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
            {errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}
          </View>
          <View>
            <Text style={styles.input}>Fax Number</Text>
            <CommonTextInput
              value={formData.FaxNumber}
              onChangeText={(value: any) => {
                setFormData({ ...formData, FaxNumber: value });
                setErrors({ ...errors, faxNumber: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
          </View>
          <View>
            <Text style={styles.input}>Street Address</Text>
            <CommonTextInput
              value={formData.StreetAddress}
              onChangeText={(value: any) => {
                setFormData({ ...formData, StreetAddress: value });
                setErrors({ ...errors, streetAddress: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
            {errors.streetAddress && (
              <Text style={styles.error}>{errors.streetAddress}</Text>
            )}
          </View>
          <View>
            <Text style={styles.input}>Country</Text>
            <CommonTextInput
              value={formData.Country}
              onChangeText={(value: any) => {
                setFormData({ ...formData, Country: value });
                setErrors({ ...errors, country: "" });
              }}
              editable={false}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
            {errors.country && (
              <Text style={styles.error}>{errors.country}</Text>
            )}
          </View>
          <View>
            <Text style={styles.input}>City</Text>
            <CommonTextInput
              value={formData.City}
              onChangeText={(value: any) => {
                setFormData({ ...formData, City: value });
                setErrors({ ...errors, city: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
            {errors.city && <Text style={styles.error}>{errors.city}</Text>}
          </View>
          <View>
            <Text style={styles.input}>State</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={{color:"black"}}
              iconStyle={styles.iconStyle}
              data={states}
              search
              maxHeight={350}
              labelField="name"
              valueField="abbreviation"
              placeholder={!isFocus ? "Select State" : "..."}
              searchPlaceholder="Search..."
              value={formData.State}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item: any) => {
                setFormData({ ...formData, State: item.abbreviation });
                setIsFocus(false);
                setErrors({ ...errors, state: "" });
              }}
            />
            {errors.state && <Text style={styles.error}>{errors.state}</Text>}
          </View>
          <View>
            <Text style={styles.input}>Zip</Text>
            <CommonTextInput
              value={formData.ZipCode}
              onChangeText={(value: any) => {
                setFormData({ ...formData, ZipCode: value });
                setErrors({ ...errors, zip: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
            {errors.zip && <Text style={styles.error}>{errors.zip}</Text>}
          </View>
          <View>
            <Text style={styles.input}>Email Address</Text>
            <CommonTextInput
              value={formData.Email}
              onChangeText={(value: any) => {
                setFormData({ ...formData, Email: value });
                setErrors({ ...errors, email: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          </View>
          <View>
            <Text style={styles.input}>Password</Text>
            <CommonTextInput
              value={formData.PreferredPassword}
              onChangeText={(value: any) => {
                setFormData({ ...formData, PreferredPassword: value });
                setErrors({ ...errors, password: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          shadowColor: "black",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 5,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
          backgroundColor: "#FFFFFF",
          padding: 20,
        }}
      >
        <SmallButton
          title={"Back"}
          onPress={() => setUserDetail(true)}
          style={{ backgroundColor: "#DDDDDD" }}
          textStyle={{ color: "black" }}
        />
        <SmallButton title={"Submit"} onPress={() => handleSubmit()} />
      </View>
    </>
  );
};

export default ContactDetails;
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
    marginTop: 10,
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
  error: {
    color: "red",
    fontFamily: "Inter-Medium",
  },
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color:'black'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:'black'
  },
});
