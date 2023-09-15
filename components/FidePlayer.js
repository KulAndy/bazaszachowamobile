import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import CustomLink from "./CustomLink";
import GlobalStyles from "./GlobalStyles";
const FidePlayer = ({ player }) => {
  return (
    <View style={GlobalStyles.column}>
      {player.name && (
        <View style={GlobalStyles.row}>
          {player.title && <Text>{player.title} </Text>}
          <Text>{player.name}</Text>
          {player.fideid && (
            <>
              <Text> ID: </Text>
              <CustomLink
                href={`https://ratings.fide.com/profile/${player.fideid}`}
              >
                {player.fideid}
              </CustomLink>
            </>
          )}
        </View>
      )}
      <View style={GlobalStyles.row}>
        {player.rating && <Text>Kl.: {player.rating} </Text>}
        {player.rapid_rating && <Text>Sz.: {player.rapid_rating} </Text>}
        {player.blitz_rating && <Text>Bł.: {player.blitz_rating} </Text>}
      </View>
      {player.birthday && (
        <View style={GlobalStyles.row}>
          <Text>rocznik: </Text>
          <Text>{player.birthday}</Text>
        </View>
      )}
    </View>
  );
};

export default FidePlayer;
