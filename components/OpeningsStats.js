import React from "react";
import { View } from "react-native";

import GlobalStyles from "./GlobalStyles";
import ColorStats from "./ColorStats";
import { Button, Text } from "react-native-paper";

import StyledText from "./StyledText";

const OpeningsStats = ({
  stats,
  setColor = () => {},
  setOpening = () => {},
}) => {
  return (
    <View>
      <View style={GlobalStyles.row}>
        <StyledText>Białe </StyledText>
        <Button
          style={GlobalStyles.button}
          onPress={() => {
            setColor("white");
            setOpening(null);
          }}
          textColor="#000"
        >
          filtruj
        </Button>
      </View>
      <ColorStats
        colorFilter={() => {
          setColor("white");
        }}
        setOpening={setOpening}
        stats={stats.whites}
      />
      <View style={GlobalStyles.row}>
        <StyledText>Czarne </StyledText>
        <Button
          style={GlobalStyles.button}
          onPress={() => {
            setColor("black");
            setOpening(null);
          }}
          textColor="#000"
        >
          filtruj
        </Button>
      </View>
      <ColorStats
        colorFilter={() => {
          setColor("black");
        }}
        setOpening={setOpening}
        stats={stats.blacks}
      />
      <Button
        style={GlobalStyles.button}
        onPress={() => {
          setColor(null);
          setOpening(null);
        }}
        textColor="#000"
      >
        usuń filtr
      </Button>
    </View>
  );
};

export default OpeningsStats;
