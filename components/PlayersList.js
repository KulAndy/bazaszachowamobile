import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { DataTable, Text } from "react-native-paper";

import GlobalStyles from "./GlobalStyles";

const PlayerList = ({
  players = [],
  goTo = false,
  styles = {},
  itemsPerPage = null,
  onItemsPerPageChange = null,
  setText = () => {},
}) => {
  if (players.length == 0) {
    return <></>;
  }
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState(
    Array.from({ length: 10 }, (_, i) => i + 1)
  );
  if (itemsPerPage == null && onItemsPerPageChange == null) {
    [itemsPerPage, onItemsPerPageChange] = useState(
      numberOfItemsPerPageList[0]
    );
  }
  const [items, setItems] = useState(
    players.map((player, index) => ({
      player: player,
      key: index,
    }))
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
    setItems(
      players.map((player, index) => ({
        player: player,
        key: index,
      }))
    );
  }, [itemsPerPage, players]);

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <DataTable style={[styles.container, GlobalStyles.table]}>
          <DataTable.Header>
            <View style={{ flex: 2 }}>
              <DataTable.Title style={{ justifyContent: "center" }}>
                Nazwisko, Imię
              </DataTable.Title>
            </View>
            {goTo && (
              <DataTable.Title style={{ justifyContent: "center" }}>
                Profil
              </DataTable.Title>
            )}
          </DataTable.Header>

          {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.key}>
              <View style={{ flex: 2 }}>
                <DataTable.Cell
                  onPress={() => setText(item.player)}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  <Text style={{ flexWrap: "wrap" }}>{item.player}</Text>
                </DataTable.Cell>
              </View>
              {goTo && (
                <DataTable.Cell
                  style={{ justifyContent: "center" }}
                  onPress={() => {
                    goTo({ data: item.player });
                  }}
                >
                  Idź
                </DataTable.Cell>
              )}
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} z ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Wierszy na stronę"}
          />
        </DataTable>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default PlayerList;

const localStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    marginLeft: 10,
  },
});
