import React, { useState, useEffect } from "react";
import { AppRoutes } from "./src/routes/app.routes";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { ThemeProvider } from "styled-components";
import themes from "./src/styles/themes/light";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "./src/contexts";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "JotiOne-Regular": require("./assets/fonts/JotiOne-Regular.ttf"),
      });
      setFontLoaded(true);
    }
    loadFonts();
    SplashScreen.preventAutoHideAsync();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <ThemeProvider theme={themes}>
      <NativeBaseProvider theme={themes}>
        <NavigationContainer>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </NavigationContainer>
      </NativeBaseProvider>
    </ThemeProvider>
  );
}
