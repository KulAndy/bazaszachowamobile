import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faUser,
  faChessBoard,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

import ColorScheme from "./ColorScheme";
import Home from "../screens/Home";
import Preparation from "../screens/Preparation";
import Players from "../screens/Players";
import Games from "../screens/Games";

const Tab = createBottomTabNavigator();

const tabOptions = {
  headerStyle: {
    backgroundColor: ColorScheme.headerColor,
  },
  headerTintColor: "white",
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#4169E1",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          display: "flex",
          backgroundColor: ColorScheme.headerColor,
        },
      }}
      backBehavior="history"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Strona główna",
          title: "Strona główna",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={size} />
          ),
          ...tabOptions,
        }}
      />
      <Tab.Screen
        name="Players"
        component={Players}
        options={{
          tabBarLabel: "Zawodnicy",
          title: "Wyszukiwarka graczy",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={size} />
          ),
          ...tabOptions,
        }}
      />
      <Tab.Screen
        name="Games"
        component={Games}
        options={{
          tabBarLabel: "Partie",
          title: "Wyszukiwarka partii",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faChessBoard} color={color} size={size} />
          ),
          ...tabOptions,
        }}
      />
      <Tab.Screen
        name="Preparation"
        component={Preparation}
        options={{
          tabBarLabel: "Przygotowanie",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faBook} color={color} size={size} />
          ),
          ...tabOptions,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
