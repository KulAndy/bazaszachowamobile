import React, { useState, useEffect } from "react";
import { Dimensions, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

import ChessEditor from "../ChessEditor";
import ChessProcessor from "../ChessProcessor";

import GlobalStyles from "../components/GlobalStyles";
import ColorScheme from "../components/ColorScheme";
import settings from "../settings";
import Tree from "../components/Tree";

const PreparationPlayer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [processor] = useState(new ChessProcessor());
  const [tree, setTree] = useState(null);
  const [fen, setFen] = useState();
  const [doMove, setDoMove] = useState(null);

  if (!(route.params && route.params?.data && route.params?.color)) {
    navigation.navigate("Preparation");
  }

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  const [games, setGames] = useState(null);

  const handleDimensionChange = ({ window }) => {
    setWindowWidth(window.width);
    setWindowHeight(window.height);
  };

  const loadGames = (player, color) => {
    let url;
    if (color != "black") {
      url =
        settings.API.BASE_URL +
        settings.API.games.filter +
        "?name=" +
        encodeURIComponent(player) +
        "&color=" +
        color +
        "&opening=";
    } else {
      url =
        settings.API.BASE_URL +
        settings.API.games.filter +
        "?name=" +
        encodeURIComponent(player) +
        "&color=" +
        "white" +
        "&opening=";
    }
    fetch(url)
      .then((response) => response.json())
      .then(async (data) => {
        setGames(data);
        await processor.getTree(data);

        const fens = await processor.searchFEN(fen);
        if (fens) {
          setTree(fens);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const searchFen = async (fen) => {
    if (tree) {
      try {
        const fens = await processor.searchFEN(fen);
        if (fens) {
          setTree(fens);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    Dimensions.addEventListener("change", handleDimensionChange);
  }, []);

  useEffect(() => {
    loadGames(route.params.data, route.params.color);
  }, [route.params]);

  useEffect(() => {
    searchFen(fen);
  }, [fen, processor]);

  return (
    <View style={GlobalStyles.mainContainer}>
      <GestureHandlerRootView style={{ width: "100%" }}>
        <ScrollView style={{ width: "100%" }}>
          {tree == null ? (
            <ActivityIndicator size="large" color={ColorScheme.linkColor} />
          ) : (
            <Tree games={tree.games} moves={tree.moves} doMove={doMove} />
          )}
          <ChessEditor
            boardSize={Math.min(windowWidth, windowHeight)}
            notationLayout={windowHeight > windowWidth ? "bottom" : "right"}
            setFen={setFen}
            setDoMove={setDoMove}
          />
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default PreparationPlayer;
