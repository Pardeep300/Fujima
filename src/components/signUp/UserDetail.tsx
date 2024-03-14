import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CommonTextInput from "../../elements/CommonTextInput";
import SmallButton from "../../elements/SmallButton";
import { IMAGES } from "../../utilities/images";
import FileUploader from "../../elements/FileUploader";
import AntDesign from "react-native-vector-icons/AntDesign";
interface UserDetailProps {
  formData: any;
  setFormData: any;
  handlePickUp: () => Promise<void>;
  handleDeleteFile: any;
  setUserDetail: any;
  errors: any;
  handleNext: any;
  setErrors: any;
}
const UserDetail: React.FC<UserDetailProps> = ({
  formData,
  setFormData,
  handlePickUp,
  handleDeleteFile,
  setUserDetail,
  errors,
  handleNext,
  setErrors,
}) => {
  return (
    <>
      <ScrollView>
        <View style={{ margin: 35 }}>
          <View>
            <Text style={styles.input}>Full Name</Text>
            <CommonTextInput
              value={formData.FullName}
              onChangeText={(value: any) => {
                setFormData({ ...formData, FullName: value });
                setErrors({ ...errors, fullName: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
            {errors.fullName && (
              <Text style={styles.error}>{errors.fullName}</Text>
            )}
          </View>
          <View>
            <Text style={styles.input}>Position</Text>
            <CommonTextInput
              value={formData.Position}
              onChangeText={(value: any) => {
                setFormData({ ...formData, Position: value });
                setErrors({ ...errors, position: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
          </View>
          <View>
            <Text style={styles.input}>Company Name</Text>
            <CommonTextInput
              value={formData.CompanyName}
              onChangeText={(value: any) => {
                setFormData({ ...formData, CompanyName: value });
                setErrors({ ...errors, companyName: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
            {errors.companyName && (
              <Text style={styles.error}>{errors.companyName}</Text>
            )}
          </View>
          <View>
            <Text style={styles.input}>Federal Tax ID Number</Text>
            <CommonTextInput
              value={formData.TaxId}
              onChangeText={(value: any) => {
                setFormData({ ...formData, TaxId: value });
                setErrors({ ...errors, federalTaxId: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
          </View>
          <View>
            <Text style={styles.input}>Reseller Tax ID</Text>
            <CommonTextInput
              value={formData.ResellerTaxId}
              onChangeText={(value: any) => {
                setFormData({ ...formData, ResellerTaxId: value });
                setErrors({ ...errors, resellarTaxId: "" });
              }}
              style={{ marginBottom: 10 }}
            ></CommonTextInput>
            {errors.resellarTaxId && (
              <Text style={styles.error}>{errors.resellarTaxId}</Text>
            )}
          </View>
          <View>
            <Text style={styles.input}>Upload Reseller Tax ID</Text>
            <FileUploader handlePickUp={handlePickUp}></FileUploader>

            {formData?.Documents?.length > 0 &&
              formData.Documents[0].name !== "" && (
                <>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Inter-Bold",
                      color: "#676767",
                      marginTop: 20,
                    }}
                  >
                    Uploaded Files
                  </Text>
                  {formData?.Documents?.map((item: any, index: any) => (
                    <View style={styles.selectedFileContainer} key={index}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#0F0F0F",
                          fontFamily: "Inter-Medium",
                        }}
                      >
                        {item?.name}
                      </Text>
                      <TouchableOpacity onPress={() => handleDeleteFile(index)}>
                        <AntDesign color={"red"} size={25} name={"delete"} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
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
          // marginTop: 50,
          backgroundColor: "#FFFFFF",
          padding: 20,
        }}
      >
        <SmallButton
          title={"Next"}
          onPress={() => handleNext()}
          style={{ backgroundColor: "#DDDDDD" }}
          textStyle={{ color: "black" }}
        />
      </View>
    </>
  );
};

export default UserDetail;

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
});
