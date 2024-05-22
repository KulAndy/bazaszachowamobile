import React from "react";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import TouchableIcon from "../components/TouchableIcon";
import PreparationForm from "./PreparationForm";
import PreparationPlayer from "./PreparationPlayer";

const Preparation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  if (route.params && route.params.data) {
    navigation.setOptions({
      title:
        (route.params?.data || "Profil zawodnika") +
        " - " +
        (route.params?.color == "black" ? "czanre" : "białe"),
      headerLeft: () => (
        <TouchableIcon
          onPress={() => {
            navigation.navigate("Preparation");
          }}
          icon={faCaretLeft}
          style={{ margin: 15 }}
        />
      ),
    });

    return <PreparationPlayer />;
  } else {
    navigation.setOptions({
      title: "Przygotowanie",
      headerLeft: () => <></>,
    });
    return <PreparationForm />;
  }
};

export default Preparation;
