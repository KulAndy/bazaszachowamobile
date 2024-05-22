import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Searchbar, ActivityIndicator } from "react-native-paper";

import GlobalStyles from "../components/GlobalStyles";
import settings from "../settings";
import PlayerList from "../components/PlayersList";
import ColorScheme from "../components/ColorScheme";
import { useNavigation, useRoute } from "@react-navigation/native";

const PlayersSearch = () => {
  const navigation = useNavigation();
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
    navigation.navigate("Players", { data });
  };

  return (
    <View style={GlobalStyles.mainContainer}>
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

export default PlayersSearch;
