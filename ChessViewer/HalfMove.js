import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

const HalfMove = ({ move = "", doMove = () => {}, isCurrent = false }) => {
  return (
    <TouchableOpacity
      onPress={doMove}
      style={{ backgroundColor: isCurrent ? "yellow" : null }}
    >
      <View style={{ backgroundColor: isCurrent ? "goldenrod" : null }}>
        <Text style={{ color: "black" }}>{move}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HalfMove;
