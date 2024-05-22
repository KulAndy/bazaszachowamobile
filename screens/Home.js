import React from "react";
import { View, Text } from "react-native";

import CustomLink from "../components/CustomLink";
import GlobalStyles from "../components/GlobalStyles";
import Header1 from "../components/Header1";

const Home = () => {
  return (
    <View style={GlobalStyles.mainContainer}>
      <Header1>Wersja mobilna strony </Header1>
      <CustomLink
        styleText={GlobalStyles.h1}
        href={"https://bazaszachowa.smallhost.pl"}
      >
        bazaszachowa.smallhost.pl/
      </CustomLink>
      <Text>{"\n"}</Text>
      <CustomLink href={"https://bazaszachowa.smallhost.pl/license/"}>
        licencja
      </CustomLink>
    </View>
  );
};

export default Home;
