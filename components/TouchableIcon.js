import React from "react";
import { TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const TouchableIcon = ({
  icon,
  size = 24,
  onPress = () => {},
  style = {},
  iconColor = "white",
  disable = false,
}) => {
  if (disable) {
    return (
      <View style={style}>
        <FontAwesomeIcon icon={icon} size={size} color={iconColor} />
      </View>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <FontAwesomeIcon icon={icon} size={size} color={iconColor} />
      </TouchableOpacity>
    );
  }
};

export default TouchableIcon;
