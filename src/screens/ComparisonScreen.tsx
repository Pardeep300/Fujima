import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { fetchComparedProduct } from "../redux/actions/comparion";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import ComparisonTable from "../components/CompareScreen";

const ComparisonScreen = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const { comparisonProduct: comparisonProduct, loading } = useSelector(
    (state: any) => state.comparedItems
  );
  useEffect(() => {
    dispatch(fetchComparedProduct(route?.params.comparedItem));
  }, [route]);

  return (
    <>
      <Layout>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Icon
              name="keyboard-arrow-left"
              style={styles.rightArrow}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={styles.headerTitle}>Comparison</Text>
          </View>
        </View>
        <ComparisonTable data={comparisonProduct} loading={loading} />
      </Layout>
    </>
  );
};

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
  contentContainer: {
    backgroundColor: "white",
    flex: 1,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 17,
    zIndex: 9999,
  },
});

export default ComparisonScreen;
