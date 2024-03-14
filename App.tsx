import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Platform,
  ImageBackground,
} from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

import RootStack from "./src/routes/RootStack";
import { IMAGES } from "./src/utilities/images";
import FlashMessage from "react-native-flash-message";
import { PaperProvider } from "react-native-paper";

function App(): React.JSX.Element {
  const [renderStack, setRenderStack] = useState(false);
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isSplash) {
      setRenderStack(true);
    }
  }, [isSplash]);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={"#ffffff"} barStyle={"dark-content"} />

      {isSplash ? (
        <ImageBackground
          source={IMAGES.SPLASH0}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={IMAGES.FUJIMA_SPLASH}
            style={{
              height: 300,
              width: 300,
              resizeMode: "contain",
            }}
          />
        </ImageBackground>
      ) : renderStack ? (
        <PaperProvider>
          <RootStack />
        </PaperProvider>
      ) : null}
      <FlashMessage position="top" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
