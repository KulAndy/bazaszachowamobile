import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Chess } from "chess.js";

import Chessboard from "./Chessboard";

import Notation from "./Notation";
import ButtonsBar from "./ButtonsBar";

const ChessViewer = ({ pgn, boardSize = 400, notationLayout = "bottom" }) => {
  const [playing, setPlaying] = useState(false);
  const [flip, setFlip] = useState(false);
  const [currentMove, setCurrentMove] = useState(0);

  let notationPlacement;
  switch (notationLayout) {
    case "left":
      notationPlacement = "row-reverse";
      break;
    case "right":
      notationPlacement = "row";
      break;
    case "top":
      notationPlacement = "column-reverse";
      break;

    default:
      notationPlacement = "column";
      break;
  }

  const chess = new Chess();
  chess.loadPgn(pgn);
  const moves = chess.history({ verbose: true });
  const simpleMoves = chess.history();
  const headers = chess.header();

  const getRandomPosition = (n) => {
    if (n == 0) {
      return "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    }
    if (n - 1 < moves.length) {
      return moves[n - 1].after;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentMove < moves.length && playing) {
        setCurrentMove(currentMove + 1);
      } else {
        setPlaying(false);
        clearInterval(timer);
      }

      return () => {
        clearTimeout(timer);
        setPlaying(false);
      };
    }, 250);
  }, [playing, currentMove]);

  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "black",
          }}
        >
          {headers?.WhiteElo || ""} {headers.White} {headers.Result}{" "}
          {headers.Black} {headers?.BlackElo || ""}
        </Text>
      </View>
      <View style={{ flexDirection: notationPlacement }}>
        <View>
          <Chessboard
            boardSize={boardSize}
            flip={flip}
            fen={getRandomPosition(currentMove)}
          />
          <ButtonsBar
            flip={() => {
              setFlip(!flip);
            }}
            currentMove={currentMove}
            setCurrentMove={setCurrentMove}
            playing={playing}
            setPlaying={setPlaying}
            moves={moves}
            width={boardSize}
          />
        </View>
        <Notation
          moves={simpleMoves}
          result={headers.Result}
          doMove={setCurrentMove}
          currentMove={currentMove}
        />
      </View>
    </View>
  );
};

export default ChessViewer;
