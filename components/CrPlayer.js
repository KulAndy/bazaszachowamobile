import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import CustomLink from "./CustomLink";
import GlobalStyles from "./GlobalStyles";
const CrPlayer = ({ player }) => {
  return (
    <View style={GlobalStyles.column}>
      <View style={GlobalStyles.row}>
        {player.kat && <Text>{player.kat} </Text>}
        {player.name && <Text>{player.name}</Text>}
      </View>
      {player.id && (
        <View style={GlobalStyles.row}>
          <CustomLink
            href={`http://www.cr-pzszach.pl/ew/viewpage.php?page_id=1&zwiazek=&typ_czlonka=&pers_id=${player.id}`}
          >
            PL-{player.id}
          </CustomLink>
          {player.fide_id && (
            <>
              <Text> </Text>
              <CustomLink
                href={`https://ratings.fide.com/profile/${player.fide_id}`}
              >
                FIDE-{player.fide_id}
              </CustomLink>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default CrPlayer;
