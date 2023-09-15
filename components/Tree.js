import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GamesTable from "./GamesTable";
import VariantsList from "./VariantsList";

const Tree = ({ games = [], moves, doMove = () => {} }) => {
  const navigation = useNavigation();
  const goTo = ({ data }) => {
    navigation.navigate("Games", { data, goBack: true });
  };

  return (
    <View>
      <GamesTable games={games} goTo={goTo} initItemsPerPage={3} />
      <VariantsList moves={moves} reverse={true} doMove={doMove} />
    </View>
  );
};

export default Tree;
