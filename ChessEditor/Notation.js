import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import HalfMove from "./HalfMove";
const Notation = ({
  moves = [],
  setIndex = () => {},
  result = null,
  currentIndex = 0,
}) => {
  let moveComponents = [];
  const processMove = (move, isMain) => {
    if (move.turn == "w") {
      moveComponents.push(
        <Text style={{ fontWeight: isMain ? "bold" : "normal" }}>
          {move.moveNo + ". "}
        </Text>
      );
    }

    moveComponents.push(
      <HalfMove
        move={move.san}
        doMove={() => {
          setIndex(move.index);
        }}
        isCurrent={currentIndex == move.index}
        isMain={isMain}
      />
    );

    if (move.variations.length > 0) {
      for (let variation of move.variations) {
        moveComponents.push(
          <Text style={{ fontWeight: isMain ? "bold" : "normal" }}>( </Text>
        );
        if (move.turn == "b") {
          moveComponents.push(<Text>{move.moveNo + "... "}</Text>);
        }
        processMove(variation, false);
        moveComponents.push(
          <Text style={{ fontWeight: isMain ? "bold" : "normal" }}>) </Text>
        );
      }
      if (move.next && move.turn == "w") {
        moveComponents.push(
          <Text style={{ fontWeight: isMain ? "bold" : "normal" }}>
            {move.moveNo + "... "}
          </Text>
        );
      }
    }

    if (move.next) {
      processMove(moves[move.next], isMain);
    }
  };

  if (moves[0].next) {
    processMove(moves[moves[0].next], true);
  }

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {moveComponents}
      {result != null && <Text style={{ color: "black" }}> {result}</Text>}
    </View>
  );
};

export default Notation;
