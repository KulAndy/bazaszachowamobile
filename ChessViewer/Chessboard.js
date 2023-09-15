import React from "react";
import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChessRook,
  faChessKnight,
  faChessBishop,
  faChessQueen,
  faChessKing,
  faChessPawn,
} from "@fortawesome/free-solid-svg-icons";

const Chessboard = ({
  fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  whitePiecesColor = "white",
  blackPiecesColor = "black",
  whiteSquareColor = "#f0d9b5",
  blackSquareColor = "#b58863",
  boardSize = 400,
  flip = false,
}) => {
  const piecesPlacement =
    fen?.split(" ")[0] ||
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  const piecesPlacementRows = piecesPlacement.split("/");
  let board = [];
  let key = 0;
  for (let i = 0; i < piecesPlacementRows.length && i < 8; i++) {
    let row = [];
    let counter = 0;
    for (let j = 0; j < piecesPlacementRows[i].length && j < 8; j++) {
      let piece = null;
      let color = null;
      switch (piecesPlacementRows[i][j]) {
        case "R":
          piece = faChessRook;
          color = whitePiecesColor;
          break;
        case "N":
          piece = faChessKnight;
          color = whitePiecesColor;
          break;
        case "B":
          piece = faChessBishop;
          color = whitePiecesColor;
          break;
        case "Q":
          piece = faChessQueen;
          color = whitePiecesColor;
          break;
        case "K":
          piece = faChessKing;
          color = whitePiecesColor;
          break;
        case "P":
          piece = faChessPawn;
          color = whitePiecesColor;
          break;
        case "r":
          piece = faChessRook;
          color = blackPiecesColor;
          break;
        case "n":
          piece = faChessKnight;
          color = blackPiecesColor;
          break;
        case "b":
          piece = faChessBishop;
          color = blackPiecesColor;
          break;
        case "q":
          piece = faChessQueen;
          color = blackPiecesColor;
          break;
        case "k":
          piece = faChessKing;
          color = blackPiecesColor;
          break;
        case "p":
          piece = faChessPawn;
          color = blackPiecesColor;
          break;
        default:
          const n = parseInt(piecesPlacementRows[i][j]);
          for (let k = 0; k < n; k++) {
            row.push(
              <View
                key={key++}
                style={{
                  flex: 1,
                  backgroundColor:
                    (i + counter++) % 2 == 1
                      ? blackSquareColor
                      : whiteSquareColor,
                  width: boardSize / 8,
                  height: boardSize / 8,
                }}
              />
            );
          }
          continue;
      }
      row.push(
        <View
          key={key++}
          style={{
            flex: 1,
            backgroundColor:
              (i + counter++) % 2 == 1 ? blackSquareColor : whiteSquareColor,
            width: boardSize / 8,
            height: boardSize / 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon icon={piece} color={color} size={boardSize / 12} />
        </View>
      );
    }
    if (flip) {
      row.reverse();
    }
    board.push(<View style={{ flexDirection: "row" }}>{row}</View>);
  }

  if (flip) {
    board.reverse();
  }

  return <View style={{ width: boardSize }}>{board}</View>;
};

export default Chessboard;
