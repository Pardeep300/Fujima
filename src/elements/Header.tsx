import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "./SearchBar";

const Header = ({ title,searchText }: { title: string,searchText:string }) => {
  const navigation: any = useNavigation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon
          name="keyboard-arrow-left"
          style={styles.rightArrow}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {!showSearchBar ? (
          <Text style={styles.headerTitle}>{title}</Text>
        ) : null}
      </View>
      <View
        style={[{ paddingRight: 10 }, showSearchBar ? { width: "88%" } : {}]}
      >
        {!showSearchBar ? (
          <Ionicons
            name="search"
            onPress={() =>
              title == "Advance Search"
                ? navigation.navigate("GlobalSearch")
                : setShowSearchBar(true)
            }
            style={styles.searchIcon}
          />
        ) : (
          <SearchBar
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            inputStyle={{ color: "rgba(255,255,255,0.8)", fontSize: 20 }}
            placeholderTextColor={"rgba(255,255,255,0.8)"}
            placeholder="Search List"
            showQR={false}
            value={searchText}
          />
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    paddingBottom: 15,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightArrow: {
    color: "#fff",
    fontSize: 40,
    opacity: 0.6,
  },
  searchIcon: {
    color: "#fff",
    fontSize: 30,
    opacity: 0.6,
  },
});
