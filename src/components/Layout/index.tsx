import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { IMAGES } from "../../utilities/images";

const Layout = (props: any) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent"  barStyle={"light-content"}/>
      <ImageBackground source={IMAGES.SPLASH0} style={styles.backgroundImage}>
        <SafeAreaView style={styles.safe_area}>{props.children}</SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, 
  },
  safe_area: {
    flex: 1,
  }
});

export default Layout;
