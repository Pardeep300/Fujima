import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const CommonModal = ({
  visible,
  closeModal,
  description,
  image,
  title,
}: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={image} style={styles.modalImage} />
          <Text style={styles.modalTitleText}>{title}</Text>
          <Text style={styles.modalText}>{description}</Text>
          <TouchableOpacity
            onPress={() => closeModal()}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    width: 80,
    height: 80,
    marginBottom: 25,
  },
  modalText: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
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

export default CommonModal;
