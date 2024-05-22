import React from "react";
import { View } from "react-native";
import {
  faCircleHalfStroke,
  faBackwardFast,
  faBackwardStep,
  faCirclePlay,
  faCircleStop,
  faForwardStep,
  faForwardFast,
} from "@fortawesome/free-solid-svg-icons";

import TouchableIcon from "./TouchableIcon";

const ButtonsBar = ({
  flip = () => {},
  playing,
  setPlaying,
  width,
  isFirst = true,
  isLast = true,
  firstMove = () => {},
  prevMove = () => {},
  nextMove = () => {},
  lastMove = () => {},
}) => {
  const activeIconColor = "black";
  const inactiveIconColor = "gray";
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: width,
        marginBottom: 15,
        marginTop: 15,
      }}
    >
      <TouchableIcon
        onPress={flip}
        icon={faCircleHalfStroke}
        iconColor={activeIconColor}
      />
      <TouchableIcon
        onPress={firstMove}
        icon={faBackwardFast}
        iconColor={isFirst ? inactiveIconColor : activeIconColor}
        disable={isFirst}
      />
      <TouchableIcon
        onPress={prevMove}
        icon={faBackwardStep}
        iconColor={isFirst ? inactiveIconColor : activeIconColor}
        disable={isFirst}
      />
      <TouchableIcon
        onPress={setPlaying}
        icon={playing ? faCircleStop : faCirclePlay}
        iconColor={activeIconColor}
      />
      <TouchableIcon
        onPress={nextMove}
        icon={faForwardStep}
        iconColor={isLast ? inactiveIconColor : activeIconColor}
        disable={isLast}
      />
      <TouchableIcon
        onPress={lastMove}
        icon={faForwardFast}
        iconColor={isLast ? inactiveIconColor : activeIconColor}
        disable={isLast}
      />
    </View>
  );
};

export default ButtonsBar;
