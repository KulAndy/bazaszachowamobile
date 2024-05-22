import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, ScrollView, Image, Dimensions } from "react-native";
import { Divider, ActivityIndicator } from "react-native-paper";

import GlobalStyles from "../components/GlobalStyles";
import settings from "../settings";
import CrPlayersList from "../components/CrPlayersList";
import ColorScheme from "../components/ColorScheme";
import FidePlayersList from "../components/FidePlayersList";
import CustomLink from "../components/CustomLink";
import OpeningsStats from "../components/OpeningsStats";
import GamesTable from "../components/GamesTable";
import SmallText from "../components/SmallText";

const Player = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const player = route.params?.data || "";
  const [loadingExtremes, setLoadingExtremes] = useState(true);
  const [maxElo, setMaxElo] = useState(null);
  const [minYear, setMinYear] = useState(null);
  const [maxYear, setMaxYear] = useState(null);
  const [loadingCr, setLoadingCr] = useState(true);
  const [crPlayers, setCrPlayers] = useState([]);
  const [loadingFide, setLoadingFide] = useState(true);
  const [fidePlayers, setFidePlayers] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [stats, setStats] = useState({ whites: [], blacks: [] });

  const [loadingGames, setLoadingGames] = useState(true);
  const [games, setGames] = useState(null);

  const [color, setColor] = useState(null);
  const [opening, setOpening] = useState(null);

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const loadExtremes = () => {
    fetch(
      settings.API.BASE_URL +
        settings.API.extremes +
        "?name=" +
        encodeURIComponent(player)
    )
      .then((response) => response.json())
      .then((data) => {
        setLoadingExtremes(false);
        setMaxElo(data.maxElo || null);
        setMinYear(data.minYear || null);
        setMaxYear(data.maxYear || null);
      })
      .catch((err) => {
        setLoadingExtremes(false);
      });
  };

  const loadCr = () => {
    fetch(
      settings.API.BASE_URL +
        settings.API.cr +
        "?name=" +
        encodeURIComponent(player)
    )
      .then((response) => response.json())
      .then((data) => {
        setLoadingCr(false);
        setCrPlayers(data);
      })
      .catch((err) => {
        setLoadingCr(false);
      });
  };

  const loadFide = () => {
    fetch(
      settings.API.BASE_URL +
        settings.API.fide +
        "?name=" +
        encodeURIComponent(player)
    )
      .then((response) => response.json())
      .then((data) => {
        setLoadingFide(false);
        setFidePlayers(data);
      })
      .catch((err) => {
        setLoadingFide(false);
      });
  };

  const loadStats = () => {
    fetch(
      settings.API.BASE_URL +
        settings.API.openings +
        "?name=" +
        encodeURIComponent(player)
    )
      .then((response) => response.json())
      .then((data) => {
        setLoadingStats(false);
        setStats(data);
      })
      .catch((error) => {
        console.error(error);
        setLoadingStats(false);
      });
  };

  const loadGames = () => {
    setLoadingGames(true);
    let url;
    if (color != null && opening != null) {
      url =
        settings.API.BASE_URL +
        settings.API.games.filter +
        "?name=" +
        encodeURIComponent(player) +
        "&color=" +
        color +
        "&opening=" +
        opening;
    } else if (color != null) {
      url =
        settings.API.BASE_URL +
        settings.API.games.filter +
        "?name=" +
        encodeURIComponent(player) +
        "&color=" +
        color +
        "&opening=";
    } else {
      url =
        settings.API.BASE_URL +
        settings.API.games.normal +
        "?white=" +
        encodeURIComponent(player) +
        "&black=" +
        "&ignore=true" +
        "&minYear=" +
        "&maxYear=" +
        "&event=" +
        "&minEco=1" +
        "&maxEco=500" +
        "&base=all" +
        "&searching=fulltext";
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoadingGames(false);
        if (color == null) {
          setGames(data.rows);
        } else {
          setGames(data);
        }
      })
      .catch((error) => {
        setLoadingGames(false);
      });
  };

  useEffect(() => {
    loadExtremes();
    loadCr();
    loadFide();
    loadStats();
    loadGames();
  }, [player]);

  useEffect(() => {
    loadGames();
  }, [color, opening]);

  const goTo = ({ data }) => {
    navigation.navigate("Games", { data, goBack: true });
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      <ScrollView>
        <View>
          {loadingExtremes ? (
            <ActivityIndicator size="large" color={ColorScheme.linkColor} />
          ) : (
            <View style={{ margin: 0 }}>
              {maxElo != null && (
                <SmallText>najwyższy osiągnięty ranking {maxElo}</SmallText>
              )}
              {minYear != null && maxYear != null && (
                <SmallText>
                  Gry z lat {minYear} - {maxYear}
                </SmallText>
              )}
            </View>
          )}
          <CustomLink
            href={`https://www.yottachess.com/player/${encodeURIComponent(
              player
            )}`}
            styleText={{ textAlign: "center" }}
          >
            yotta
          </CustomLink>
          {loadingCr ? (
            <ActivityIndicator size="large" color={ColorScheme.linkColor} />
          ) : (
            <>
              <CrPlayersList players={crPlayers} />
              {!loadingFide && (
                <Divider bold theme={{ colors: { primary: "black" } }} />
              )}
            </>
          )}
          {loadingFide ? (
            <ActivityIndicator size="large" color={ColorScheme.linkColor} />
          ) : (
            <FidePlayersList players={fidePlayers} />
          )}
        </View>
        {loadingStats ? (
          <ActivityIndicator size="large" color={ColorScheme.linkColor} />
        ) : (
          <OpeningsStats
            setColor={setColor}
            setOpening={setOpening}
            stats={stats}
          />
        )}
        {loadingExtremes || loadingCr || loadingFide || loadingStats ? (
          <ActivityIndicator size="large" color={ColorScheme.linkColor} />
        ) : (
          <Image
            height={Math.min(width, height)}
            width={Math.min(width, height)}
            source={{
              uri: `${settings.API.BASE_URL}${
                settings.API.graph.jpeg
              }?name=${encodeURIComponent(player)}`,
            }}
          />
        )}
        {loadingGames ? (
          <ActivityIndicator size="large" color={ColorScheme.linkColor} />
        ) : (
          <GamesTable games={games} goTo={goTo} />
        )}
      </ScrollView>
    </View>
  );
};

export default Player;
