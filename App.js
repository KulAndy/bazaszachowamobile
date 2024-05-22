import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";

import TabNavigator from "./components/TabNavigator";

const App = () => {
  return (
    <PaperProvider>
      <StatusBar />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
