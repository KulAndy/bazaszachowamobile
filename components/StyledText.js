import React from "react";
import { Text } from "react-native-paper";
import GlobalStyles from "./GlobalStyles";

const StyledText = ({ children, style = {} }) => {
  return <Text style={[GlobalStyles.text, style]}>{children}</Text>;
};

export default StyledText;
