import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import {
  Button,
  Checkbox,
  Divider,
  HelperText,
  TextInput,
  ActivityIndicator,
  Searchbar,
} from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation, useRoute } from "@react-navigation/native";

import settings from "../settings";
import GlobalStyles from "../components/GlobalStyles";
import ColorScheme from "../components/ColorScheme";
import GamesTable from "../components/GamesTable";
import StyledText from "../components/StyledText";
import PlayerList from "../components/PlayersList";

const GamesSearch = () => {
  const navigation = useNavigation();
  let ecoCodes = Array.from("ABCDE", (letter) =>
    Array.from({ length: 10 }, (_, i) =>
      Array.from({ length: 10 }, (_, j) => letter + i + j)
    )
  ).flat(2);

  const [white, setWhite] = useState("");
  const [whites, setWhites] = useState([]);
  const [black, setBlack] = useState("");
  const [blacks, setBlacks] = useState([]);
  const [ignoreColor, setIgnoreColor] = useState(false);
  const [minYear, setMinYear] = useState("1475");
  const [maxYear, setMaxYear] = useState(new Date().getFullYear().toString());
  const [minEco, setMinEco] = useState(1);
  const [maxEco, setMaxEco] = useState(500);

  const [searched, setSearched] = useState(false);
  const [loadingGames, setLoadingGames] = useState(false);
  const [games, setGames] = useState(null);

  const [whitesPerPage, onWhitesPerPageChange] = useState(1);
  const [blacksPerPage, onBlacksPerPageChange] = useState(1);

  const fetchData = async (text, setPlayers = () => {}) => {
    try {
      if (text.trim().length >= 4) {
        const response = await fetch(
          settings.API.BASE_URL +
            settings.API.players +
            "?name=" +
            encodeURIComponent(text.trim())
        );
        const jsonData = await response.json();

        setPlayers(jsonData);
      } else {
        setPlayers([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(white, setWhites);
  }, [white]);

  useEffect(() => {
    fetchData(black, setBlacks);
  }, [black]);

  const submit = () => {
    if (white.length > 0 || black.length > 0) {
      loadGames(white, black, ignoreColor, minYear, maxYear, minEco, maxEco);
    } else {
      Alert.alert(
        "Błąd",
        "Wymagany jest biały lub czarny zawodnik",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
    }
  };

  const goTo = ({ data }) => {
    navigation.navigate("Games", { data });
  };

  const loadGames = (
    white,
    black,
    ignoreColor,
    minYear,
    maxYear,
    minEco,
    maxEco
  ) => {
    setSearched(true);
    setLoadingGames(true);
    fetch(
      settings.API.BASE_URL +
        settings.API.games.normal +
        "?white=" +
        encodeURIComponent(white.trim()) +
        "&black=" +
        encodeURIComponent(black.trim()) +
        "&ignore=" +
        ignoreColor +
        "&minYear=" +
        minYear.trim() +
        "&maxYear=" +
        maxYear.trim() +
        "&event=" +
        "&minEco=" +
        minEco +
        "&maxEco=" +
        maxEco +
        "&base=all" +
        "&searching=classic"
    )
      .then((response) => response.json())
      .then((data) => {
        setLoadingGames(false);
        setGames(data.rows);
      })
      .catch((error) => {
        setLoadingGames(false);
      });
  };

  return (
    <View style={[GlobalStyles.mainContainer, { width: "100%" }]}>
      <ScrollView style={{ width: "100%" }}>
        <Searchbar
          placeholder="Nowak, Jan"
          onChangeText={(text) => setWhite(text)}
          value={white}
        />
        <PlayerList
          players={whites.map((item) => item.fullname)}
          itemsPerPage={whitesPerPage}
          onItemsPerPageChange={onWhitesPerPageChange}
          setText={setWhite}
        />
        <View style={localStyles.minorContainer}>
          <HelperText
            style={{
              color: ColorScheme.textColor,
            }}
          >
            vs
          </HelperText>
        </View>
        <Searchbar
          placeholder="Nowak, Jan"
          onChangeText={(text) => setBlack(text)}
          value={black}
        />
        <PlayerList
          players={blacks.map((item) => item.fullname)}
          itemsPerPage={blacksPerPage}
          onItemsPerPageChange={onBlacksPerPageChange}
          setText={setBlack}
        />
        <View style={localStyles.minorContainer}>
          <Checkbox
            status={ignoreColor ? "checked" : "unchecked"}
            onPress={() => {
              setIgnoreColor(!ignoreColor);
            }}
            uncheckedColor={ColorScheme.linkColor}
            color={ColorScheme.linkColor}
          />
          <StyledText>ignoruj kolory</StyledText>
        </View>
        <View style={localStyles.minorContainer}>
          <StyledText>lata</StyledText>
          <Divider horizontalInset bold />
          <TextInput
            style={{ width: "30%" }}
            inputMode="numeric"
            maxLength={4}
            onChangeText={(text) => setMinYear(text)}
            value={minYear}
          />
          <Divider horizontalInset bold />
          <TextInput
            style={{ width: "30%" }}
            inputMode="numeric"
            maxLength={4}
            onChangeText={(text) => setMaxYear(text)}
            value={maxYear}
          />
        </View>
        <View style={[localStyles.minorContainer, { marginTop: 15 }]}>
          <SelectDropdown
            data={ecoCodes}
            onSelect={(selectedItem, index) => {
              setMinEco(index + 1);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            defaultValueByIndex={minEco - 1}
          />
          <Divider horizontalInset bold />
          <SelectDropdown
            data={ecoCodes}
            onSelect={(selectedItem, index) => {
              setMaxEco(index + 1);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            defaultValueByIndex={maxEco - 1}
          />
        </View>
        <View style={localStyles.minorContainer}>
          <HelperText style={{ color: ColorScheme.textColor }}>
            kody ECO
          </HelperText>
        </View>

        <Button style={GlobalStyles.button} onPress={submit}>
          Szukaj
        </Button>
        {loadingGames ? (
          <ActivityIndicator size="large" color={ColorScheme.linkColor} />
        ) : (
          <>{searched && <GamesTable games={games} goTo={goTo} />}</>
        )}
      </ScrollView>
    </View>
  );
};

export default GamesSearch;

const localStyles = StyleSheet.create({
  minorContainer: {
    ...GlobalStyles.row,
    alignItems: "center",
    justifyContent: "center",
  },
});
