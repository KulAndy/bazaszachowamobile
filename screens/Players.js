import React from "react";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import PlayersSearch from "./PlayersSearch";
import Player from "./Player";
import TouchableIcon from "../components/TouchableIcon";

const Players = () => {
  const navigation = useNavigation();
  const route = useRoute();

  if (route.params && route.params.data) {
    navigation.setOptions({
      title: route.params?.data || "Profil zawodnika",
      headerLeft: () => (
        <TouchableIcon
          onPress={() => {
            navigation.navigate("Players");
          }}
          icon={faCaretLeft}
          style={{ margin: 15 }}
        />
      ),
    });

    return <Player />;
  } else {
    navigation.setOptions({
      title: "Wyszukiwarka graczy",
      headerLeft: () => <></>,
    });
    return <PlayersSearch />;
  }
};

export default Players;
