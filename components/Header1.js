import React from "react";
import { Text } from "react-native-paper";
import GlobalStyles from "./GlobalStyles";

const Header1 = ({ children }) => {
  return <Text style={GlobalStyles.h1}>{children}</Text>;
};

export default Header1;
