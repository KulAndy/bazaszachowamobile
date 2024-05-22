import React, { useState, useEffect } from "react";
import { Dimensions, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

import ChessViewer from "../ChessViewer";

import GlobalStyles from "../components/GlobalStyles";
import settings from "../settings";
import ColorScheme from "../components/ColorScheme";
import GameControllers from "../components/GameControllers";

const Game = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [gameId, setGameId] = useState(route.params?.data.id || "");
  const list = route.params?.data.list || [];
  const activeIconColor = "black";
  const inactiveIconColor = "gray";

  const [index, setIndex] = useState(list.indexOf(gameId));

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );
  const [loaded, setLoaded] = useState(false);

  const [pgn, setPgn] = useState(
    `[Event "?"]
  [Site "?"]
  [Date "????.??.??"]
  [Round "?"]
  [White "?"]
  [Black "?"]
  [Result "*"]

  1. *
  `
  );

  const handleDimensionChange = ({ window }) => {
    setWindowWidth(window.width);
    setWindowHeight(window.height);
  };

  useEffect(() => {
    Dimensions.addEventListener("change", handleDimensionChange);
  }, []);

  useEffect(() => {
    setGameId(list[index]);
    setLoaded(false);
    fetch(settings.PGN_GAME + "?id=" + (list[index] || "") + "&table=all")
      .then((response) => response.text())
      .then((data) => {
        setLoaded(true);
        setPgn(data);
      })
      .catch((error) => {
        setLoaded(true);
        console.error(error);
      });
  }, [index]);

  return (
    <View
      style={[GlobalStyles.mainContainer, { flexWrap: "wrap", width: "100%" }]}
    >
      <GestureHandlerRootView style={{ width: "100%" }}>
        <ScrollView style={{ width: "100%" }}>
          <GameControllers
            inactiveIconColor={inactiveIconColor}
            activeIconColor={activeIconColor}
            setIndex={setIndex}
            index={index}
            maxIndex={list.length - 1}
          />
          {!loaded ? (
            <ActivityIndicator size="large" color={ColorScheme.linkColor} />
          ) : (
            <ChessViewer
              pgn={pgn}
              boardSize={Math.min(windowWidth, windowHeight)}
              notationLayout={windowHeight > windowWidth ? "bottom" : "right"}
            />
          )}
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default Game;
