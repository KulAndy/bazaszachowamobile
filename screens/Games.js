import React from "react";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import GamesSearch from "./GamesSearch";
import Game from "./Game";
import TouchableIcon from "../components/TouchableIcon";

const Games = () => {
  const navigation = useNavigation();
  const route = useRoute();

  if (route.params && route.params.data) {
    navigation.setOptions({
      title: "Partia",
      headerLeft: () => (
        <TouchableIcon
          onPress={() => {
            navigation.navigate("Games");
            if (route.params.goBack) {
              navigation.goBack();
            }
          }}
          icon={faCaretLeft}
          style={{ margin: 15 }}
        />
      ),
    });

    return <Game />;
  } else {
    navigation.setOptions({
      title: "Wyszukiwarka partii",
      headerLeft: () => <></>,
    });
    return <GamesSearch />;
  }
};

export default Games;
