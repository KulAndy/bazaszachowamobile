import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  Searchbar,
  ActivityIndicator,
  RadioButton,
  Text,
} from "react-native-paper";

import GlobalStyles from "../components/GlobalStyles";
import settings from "../settings";
import PlayerList from "../components/PlayersList";
import ColorScheme from "../components/ColorScheme";
import { useNavigation, useRoute } from "@react-navigation/native";
import StyledText from "../components/StyledText";

const PreparationForm = () => {
  const navigation = useNavigation();
  const [color, setColor] = useState("white");
  const [text, setText] = useState("");
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, onItemsPerPageChange] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [text]);

  const goTo = ({ data }) => {
    navigation.navigate("Preparation", { data, color });
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <View
        style={[
          GlobalStyles.row,
          {
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
          },
        ]}
      >
        <StyledText>Białe</StyledText>
        <RadioButton
          value="white"
          status={color === "white" ? "checked" : "unchecked"}
          onPress={() => setColor("white")}
        />
        <StyledText>Czarne</StyledText>
        <RadioButton
          value="black"
          status={color === "black" ? "checked" : "unchecked"}
          onPress={() => setColor("black")}
        />
      </View>
      <Searchbar placeholder="Nowak, Jan" onChangeText={setText} value={text} />
      {isLoading ? (
        <ActivityIndicator size="large" color={ColorScheme.linkColor} />
      ) : (
        <PlayerList
          players={players.map((item) => item.fullname)}
          goTo={goTo}
          styles={{ flex: 2 }}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          setText={setText}
        />
      )}
    </View>
  );
};

export default PreparationForm;
