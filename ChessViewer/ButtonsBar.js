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
  currentMove,
  setCurrentMove,
  playing,
  setPlaying,
  moves,
  width,
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
        onPress={() => {
          setCurrentMove(0);
        }}
        icon={faBackwardFast}
        iconColor={currentMove === 0 ? inactiveIconColor : activeIconColor}
        disable={currentMove === 0}
      />
      <TouchableIcon
        onPress={() => {
          setCurrentMove(currentMove - 1);
        }}
        icon={faBackwardStep}
        iconColor={currentMove === 0 ? inactiveIconColor : activeIconColor}
        disable={currentMove === 0}
      />
      <TouchableIcon
        onPress={() => {
          setPlaying(!playing);
        }}
        icon={playing ? faCircleStop : faCirclePlay}
        iconColor={activeIconColor}
      />
      <TouchableIcon
        onPress={() => {
          setCurrentMove(currentMove + 1);
        }}
        icon={faForwardStep}
        iconColor={
          currentMove >= moves.length ? inactiveIconColor : activeIconColor
        }
        disable={currentMove >= moves.length}
      />
      <TouchableIcon
        onPress={() => {
          setCurrentMove(moves.length);
        }}
        icon={faForwardFast}
        iconColor={
          currentMove >= moves.length ? inactiveIconColor : activeIconColor
        }
        disable={currentMove >= moves.length}
      />
    </View>
  );
};

export default ButtonsBar;
