import React from "react";
import { Text } from "react-native-paper";
import GlobalStyles from "./GlobalStyles";

const SmallText = ({ children, style = {} }) => {
  return <Text style={[GlobalStyles.smallText, style]}>{children}</Text>;
};

export default SmallText;
