import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ProductListEnum } from "../../constants/Enum";
import { Switch } from "react-native-paper";
import CommonSwitch from "../../elements/CommonSwitch";
import theme from "../../config/theme";

const FilterBar = ({ listType }: any) => {
  const [filters, setFilters] = useState<any>({
    sort: "",
    price: "",
    stockItem: true,
    categories: [],
  });
  const [categories, setCategories] = useState([
    {
      name: "Apparel",
    },
    {
      name: "Incense & Essensial Oils",
    },
    {
      name: "Roll Your Own",
    },
    {
      name: "Storage",
    },
  ]);
  const sortOptions = [
    { label: "Created At", value: "1" },
    { label: "Name", value: "2" },
  ];

  const priceOptions = [
    { label: "Created At", value: "1" },
    { label: "Name", value: "2" },
  ];

  const handleFilter = (
    value: any,
    target: "sort" | "price" | "stockItem" | "categories"
  ) => {
    if (target === "categories") {
      let immutableState: string[] = [...filters.categories];
      if (immutableState.some((item) => item === value))
        immutableState = immutableState.filter((item) => item !== value);
      else immutableState.push(value);
      setFilters({ ...filters, categories: immutableState });
    } else setFilters({ ...filters, [target]: value });
    if (listType === ProductListEnum.CLEARANCE) {
      console.log("Call Clearance Filter API...");
    } else if (listType === ProductListEnum.MOST_REQUESTED) {
      console.log("Call Most Reqeusted Filter API...");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.subHeader}>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={{ color: "black" }}
            data={sortOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"Sort By"}
            searchPlaceholder="Search..."
            value={filters.sort}
            onChange={(item: any) => {
              setFilters({ ...filters, sort: item.abbreviation });
            }}
          />
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={{ color: "black" }}
            data={sortOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"Price"}
            searchPlaceholder="Search..."
            value={filters.sort}
            onChange={(item: any) => {
              setFilters({ ...filters, sort: item.abbreviation });
            }}
          />
          <CommonSwitch
            value={filters.stockItem}
            setValue={() => {
              handleFilter(!filters.stockItem, "stockItem");
            }}
            text="Show Item in Stock"
          />
        </View>
      </ScrollView>
      <View style={[styles.subHeader, styles.subHeader2]}>
        <FlatList
          data={categories}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => handleFilter(item.name, "categories")}
                style={[
                  styles.categoryContainer,
                  categories?.length - 1 == index
                    ? { borderRightWidth: 0 }
                    : {},
                ]}
              >
                <Text
                  style={[
                    styles.categoriesStyle,
                    filters.categories.some(
                      (category: string) => category == item.name
                    )
                      ? { color: theme.colors.primary }
                      : {},
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  dropdown: {
    borderColor: "#b1b1b1",
    borderWidth: 0.5,
    borderRadius: 50,
    paddingHorizontal: 10,
    minWidth: 110,
  },
  placeholderStyle: {
    fontSize: 18,
    color: "#676767",
    fontWeight: "500",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 20,
    fontSize: 16,
  },
  subHeader: {
    paddingVertical: 10,
    flexDirection: "row",
    gap: 10,
    height: 50,
    paddingHorizontal: 20,
  },
  subHeader2: {
    borderColor: "#676767",
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "center",
  },
  categoriesStyle: {
    fontSize: 20,
    color: "#676767",
    fontWeight: "500",
  },
  categoryContainer: {
    borderColor: "#676767",
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 15,
  },
});
