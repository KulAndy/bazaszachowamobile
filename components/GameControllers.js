import React from "react";
import { View } from "react-native";
import {
  faBackwardFast,
  faBackwardStep,
  faForwardStep,
  faForwardFast,
} from "@fortawesome/free-solid-svg-icons";

import TouchableIcon from "../ChessEditor/TouchableIcon";

const GameControllers = ({
  inactiveIconColor = "gray",
  activeIconColor = "black",
  setIndex = () => {},
  index = 0,
  maxIndex = Infinity,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <TouchableIcon
        onPress={() => {
          setIndex(0);
        }}
        icon={faBackwardFast}
        iconColor={index < 1 ? inactiveIconColor : activeIconColor}
        disable={index < 1}
      />
      <TouchableIcon
        onPress={() => {
          setIndex(index - 1);
        }}
        icon={faBackwardStep}
        iconColor={index < 1 ? inactiveIconColor : activeIconColor}
        disable={index < 1}
      />
      <TouchableIcon
        onPress={() => {
          setIndex(index + 1);
        }}
        icon={faForwardStep}
        iconColor={index >= maxIndex ? inactiveIconColor : activeIconColor}
        disable={index >= maxIndex}
      />
      <TouchableIcon
        onPress={() => {
          setIndex(maxIndex);
        }}
        icon={faForwardFast}
        iconColor={index >= maxIndex ? inactiveIconColor : activeIconColor}
        disable={index >= maxIndex}
      />
    </View>
  );
};

export default GameControllers;
