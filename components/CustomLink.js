import React from "react";
import { Text, TouchableOpacity, Linking, StyleSheet } from "react-native";
import ColorScheme from "./ColorScheme";

const CustomLink = ({ styleOpacity = {}, styleText = {}, href, children }) => {
  const openLink = () => {
    Linking.openURL(href);
  };

  return (
    <TouchableOpacity style={styleOpacity} onPress={openLink}>
      <Text style={[styleText, styles.link]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: ColorScheme.linkColor,
    textDecorationLine: "underline",
  },
});

export default CustomLink;
