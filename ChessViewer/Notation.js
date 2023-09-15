import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import Move from "./Move";

const Notation = ({
  moves = [],
  doMove = () => {},
  result = null,
  currentMove = 0,
}) => {
  let moveComponents = [];
  for (let i = 0; i < Math.round(moves.length / 2); i++) {
    moveComponents.push(
      <Move
        currentMove={currentMove}
        moveNo={i + 1}
        whiteMove={moves[i * 2]}
        blackMove={i * 2 + 1 < moves.length ? moves[i * 2 + 1] : null}
        doWhiteMove={() => {
          doMove(i * 2 + 1);
        }}
        doBlackMove={() => {
          doMove(i * 2 + 2);
        }}
      />
    );
  }

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {moveComponents}
      {result != null && <Text style={{ color: "black" }}> {result}</Text>}
    </View>
  );
};

export default Notation;
