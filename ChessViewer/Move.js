import React from "react";

import HalfMove from "./HalfMove";
import { View } from "react-native";
import { Text } from "react-native-paper";

const Move = ({
  moveNo = 1,
  whiteMove = null,
  blackMove = null,
  doWhiteMove = () => {},
  doBlackMove = () => {},
  currentMove = 0,
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: "black" }}>{moveNo}. </Text>
      {whiteMove != null && (
        <HalfMove
          move={whiteMove}
          doMove={doWhiteMove}
          isCurrent={moveNo * 2 - 1 == currentMove}
        />
      )}
      {blackMove != null && (
        <>
          <Text> </Text>
          <HalfMove
            move={blackMove}
            doMove={doBlackMove}
            isCurrent={moveNo * 2 == currentMove}
          />
        </>
      )}
      <Text> </Text>
    </View>
  );
};

export default Move;
