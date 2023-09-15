import React, { useState, useEffect, useRef } from "react";
import { View, Modal } from "react-native";
import { Text } from "react-native-paper";
import { Chess } from "chess.js";
import {
  faChessRook,
  faChessKnight,
  faChessBishop,
  faChessQueen,
} from "@fortawesome/free-solid-svg-icons";

import Chessboard from "./Chessboard";
import TouchableIcon from "./TouchableIcon";
import Notation from "./Notation";
import ButtonsBar from "./ButtonsBar";

const ChessEditor = ({
  pgn = null,
  boardSize = 400,
  notationLayout = "bottom",
  showPlayers = true,
  setFen = () => {},
  setDoMove = () => {},
}) => {
  const [playing, setPlaying] = useState(false);
  const [flip, setFlip] = useState(false);
  const [headers, setHeaders] = useState({ White: "", Black: "" });

  const history = useRef([
    {
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      san: "",
    },
  ]);
  const index = useRef(0);

  const setHistory = (newHistory) => {
    history.current = newHistory;
    setFen(newHistory[index.current].fen);
  };

  const setIndex = (newIndex) => {
    index.current = newIndex;
    setFen(history.current[newIndex].fen);
  };

  const [sourceSquare, setSourceSquare] = useState(null);
  const [destSquare, setDestSquare] = useState(null);

  const [promotionMenuVisible, setPromotionMenuVisible] = useState(false);

  const addMove = (move) => {
    let chess = new Chess(history.current[index.current].fen);
    if (chess.isGameOver()) {
    } else {
      let moveNo = chess.moveNumber();
      let doneMove;
      try {
        doneMove = chess.move(move);
      } catch (err) {
        if (
          move?.from &&
          chess
            .moves({ square: move.from, verbose: true })
            .map((obj) => obj.to)
            .includes(move.to)
        ) {
          setPromotionMenuVisible(true);
          return false;
        }
        return true;
      }
      if (doneMove) {
        let newHistory = [...history.current];
        let moveObj = {
          variations: [],
          from: doneMove.from,
          to: doneMove.to,
          turn: doneMove.color,
          fen: doneMove.after,
          index: newHistory.length,
          san: doneMove.san,
          prev: index.current,
          moveNo,
        };
        if (newHistory[index.current].next) {
          if (
            newHistory[newHistory[index.current].next].to ||
            (doneMove.to &&
              newHistory[newHistory[index.current].next].from != doneMove.from)
          ) {
            newHistory[newHistory[index.current].next].variations.push(moveObj);
          }
        } else {
          newHistory[index.current].next = newHistory.length;
        }
        newHistory.push(moveObj);
        setHistory(newHistory);
        setIndex(history.current.length - 1);
      }
    }
    return true;
  };

  const getPrevIndex = (currentIndex) => {
    if (currentIndex == 0) {
      return 0;
    } else {
      return history.current[currentIndex].prev;
    }
  };

  const getNextMoveIndex = (currentIndex) => {
    if (history.current[currentIndex].next) {
      return history.current[currentIndex].next;
    }
  };

  const getLastMoveIndex = (currentIndex) => {
    let nextMoveIndex = getNextMoveIndex(currentIndex);
    while (nextMoveIndex != null && getNextMoveIndex(nextMoveIndex) != null) {
      nextMoveIndex = getNextMoveIndex(nextMoveIndex);
    }
    return nextMoveIndex;
  };

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

  const captureSquare = (square) => {
    let chess = new Chess(history.current[index.current].fen);
    if (!chess.isGameOver()) {
      if (sourceSquare == null) {
        setSourceSquare(square);
      } else {
        setDestSquare(square);
        if (addMove({ from: sourceSquare, to: square })) {
          setSourceSquare(null);
          setDestSquare(null);
        }
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (getNextMoveIndex(index.current) != null && playing) {
        setIndex(getNextMoveIndex(index.current));
      } else {
        setPlaying(false);
        clearInterval(timer);
      }

      return () => {
        clearTimeout(timer);
        setPlaying(false);
      };
    }, 250);
  }, [playing, index]);

  useEffect(() => {
    setFen(history.current[index.current].fen);
  }, [history.current, index.current]);

  useEffect(() => {
    let currentIndex = index.current || 0;
    if (pgn != null) {
      const chess = new Chess();
      chess.loadPgn(pgn);
      const moves = chess.history({ verbose: true });
      setHeaders(chess.header());
      let counter = history.current[currentIndex]?.moveNo || 1;
      let newHistory = [...history.current];
      for (const move of moves) {
        let moveObj = {
          variations: [],
          from: move.from,
          to: move.to,
          turn: move.color,
          fen: move.after,
          index: newHistory.length,
          san: move.san,
          prev: currentIndex,
          moveNo: move.color == "w" ? counter : counter++,
        };
        if (newHistory[currentIndex].next) {
          if (
            newHistory[newHistory[currentIndex].next].to ||
            (move.to &&
              newHistory[newHistory[currentIndex].next].from != move.from)
          ) {
            newHistory[newHistory[currentIndex++].next].variations.push(
              moveObj
            );
          }
        } else {
          newHistory[currentIndex++].next = newHistory.length;
        }
        newHistory.push(moveObj);
      }
      setHistory(newHistory);
      setIndex(history.current.length - 1);
    }
    setDoMove(() => addMove);
  }, []);

  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showPlayers && (
          <Text
            style={{
              color: "black",
            }}
          >
            {headers?.WhiteElo || ""} {headers.White} {headers.Result}{" "}
            {headers.Black} {headers?.BlackElo || ""}
          </Text>
        )}
      </View>
      <View style={{ flexDirection: notationPlacement }}>
        <View>
          <Modal animationType="slide" visible={promotionMenuVisible}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableIcon
                icon={faChessQueen}
                onPress={() => {
                  addMove({
                    from: sourceSquare,
                    to: destSquare,
                    promotion: "q",
                  });
                  setPromotionMenuVisible(false);
                  setSourceSquare(null);
                  setDestSquare(null);
                }}
              />
              <TouchableIcon
                icon={faChessRook}
                onPress={() => {
                  addMove({
                    from: sourceSquare,
                    to: destSquare,
                    promotion: "r",
                  });
                  setPromotionMenuVisible(false);
                  setSourceSquare(null);
                  setDestSquare(null);
                }}
              />
              <TouchableIcon
                icon={faChessBishop}
                onPress={() => {
                  addMove({
                    from: sourceSquare,
                    to: destSquare,
                    promotion: "b",
                  });
                  setPromotionMenuVisible(false);
                  setSourceSquare(null);
                  setDestSquare(null);
                }}
              />
              <TouchableIcon
                icon={faChessKnight}
                onPress={() => {
                  addMove({
                    from: sourceSquare,
                    to: destSquare,
                    promotion: "n",
                  });
                  setPromotionMenuVisible(false);
                  setSourceSquare(null);
                  setDestSquare(null);
                }}
              />
            </View>
          </Modal>

          <Chessboard
            boardSize={boardSize}
            flip={flip}
            fen={history.current[index.current].fen}
            sendSquare={captureSquare}
            sourceSquare={sourceSquare}
          />
          <ButtonsBar
            flip={() => {
              setFlip(!flip);
            }}
            playing={playing}
            setPlaying={setPlaying}
            width={boardSize}
            firstMove={() => {
              setIndex(0);
            }}
            prevMove={() => {
              setIndex(getPrevIndex(index.current));
            }}
            nextMove={() => {
              setIndex(getNextMoveIndex(index.current));
            }}
            lastMove={() => {
              setIndex(getLastMoveIndex(index.current));
            }}
            isFirst={index.current == 0}
            isLast={getNextMoveIndex(index.current) == null}
          />
        </View>
        <Notation
          moves={history.current}
          setIndex={setIndex}
          currentIndex={index.current}
        />
      </View>
    </View>
  );
};

export default ChessEditor;
