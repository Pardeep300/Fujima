import React ,{useState}from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button,
  ActivityIndicator,
} from "react-native";
import SearchBar from "../elements/SearchBar";
import ProductData from "../components/productData/ProductData";
import { IMAGES } from "../utilities/images";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import theme from "../config/theme";
const ApparelScreen = () => {
  const { data: productData, loading } = useSelector(
    (state: any) => state.products
  );
  const [fav, setFav] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const desiredWidth = screenWidth * 1.14;
  const desiredHeight = screenHeight * 0.4;
  return (
    <>
      <ImageBackground source={IMAGES.SPLASH0} style={styles.backgroundImage}>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text>
                <AntDesign
                  name="left"
                  size={50}
                  color={"gray"}
                  //@ts-ignore
                  onPress={() => navigation.goBack()}
                />
              </Text>
              <SearchBar />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
      <ScrollView>
        <View>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                paddingLeft: 15,
              }}
            >
              Apparel
            </Text>
          </View>
        </View>
        <View style={styles.imagecontainer}>
          <Image
            source={IMAGES.APRELBANNER}
            style={[
              styles.banner,
              { width: desiredWidth, height: desiredHeight },
            ]}
            resizeMode="contain"
          />
        </View>
           <View>
           {loading ? (
                     <ActivityIndicator color={theme.colors.primary} size="large" />
                  ) : (
                    <FlatList
                      style={{
                        paddingHorizontal: 20,
                        marginRight: 10,
                        paddingRight: 10,
                      }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={productData?.ProductList}
                      renderItem={(item) => (
                        <ProductData
                          productData={item}
                        ></ProductData>
                      )}
                    ></FlatList>
                  )}
           </View>
        <View style={{ flexDirection: "row" ,marginTop:0 ,padding:0}}>
          <Text
            style={{
              fontSize: 30,
              color: "black",
              fontWeight: "bold",
              paddingLeft: 20,
            }}
          >
            Bag
          </Text>
          <Text style={{paddingLeft: 20,}}><FontAwesome5  name="angle-right" size={40}  color={"brown"} /></Text>
        </View>
        <View style={{ flexDirection: "row" ,marginTop:0 ,padding:0}}>
          <Text
            style={{
              fontSize: 30,
              color: "black",
              fontWeight: "bold",
              paddingLeft: 20,
            }}
          >
            Clothing
          </Text>
          <Text style={{paddingLeft: 20,}}><FontAwesome5  name="angle-right" size={40}  color={"brown"} /></Text>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: 100,
  },
  banner: {
    height: 250,
    width: 500,
    aspectRatio: 3 / 1,
  },
  imagecontainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ApparelScreen;
