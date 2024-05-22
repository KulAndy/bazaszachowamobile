import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { DataTable, Text } from "react-native-paper";

import GlobalStyles from "./GlobalStyles";

const GamesTable = ({
  games,
  goTo = () => {},
  reverse = false,
  initItemsPerPage = 5,
}) => {
  if (games == null) {
    return (
      <View style={[GlobalStyles.table, { width: "100%" }]}>
        <Text>Znalezionych gier: 0</Text>
      </View>
    );
  }

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([1, 2, 3, 4, 5, 10, 15, 25, 50]);
  const [itemsPerPage, onItemsPerPageChange] = useState(initItemsPerPage);

  let items = games.map((game, index) => ({
    ...game,
    key: index,
  }));

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={GlobalStyles.table}>
      <Text>Znalezionych gier: {games.length || 0}</Text>
      <DataTable>
        <DataTable.Header>
          <View style={{ flex: 2 }}>
            <DataTable.Title>Biały</DataTable.Title>
          </View>
          <DataTable.Title>wynik</DataTable.Title>
          <View style={{ flex: 2 }}>
            <DataTable.Title>Czarny</DataTable.Title>
          </View>
          <DataTable.Title>Rok</DataTable.Title>
        </DataTable.Header>
      </DataTable>

      {reverse
        ? items
            .slice(from, to)
            .map((item) => (
              <DataTable.Row
                key={item.key}
                onPress={() => {
                  goTo({
                    data: { id: item.id, list: items.map((item) => item.id) },
                  });
                }}
              >
                <View style={{ flex: 2 }}>
                  <DataTable.Cell>{item.White}</DataTable.Cell>
                </View>
                <DataTable.Cell>{item.Result} </DataTable.Cell>
                <View style={{ flex: 2 }}>
                  <DataTable.Cell>{item.Black}</DataTable.Cell>
                </View>
                <DataTable.Cell>{item.Year}</DataTable.Cell>
              </DataTable.Row>
            ))
            .reverse()
        : items.slice(from, to).map((item) => (
            <DataTable.Row
              key={item.key}
              onPress={() => {
                goTo({
                  data: { id: item.id, list: items.map((item) => item.id) },
                });
              }}
            >
              <View style={{ flex: 2 }}>
                <DataTable.Cell>{item.White}</DataTable.Cell>
              </View>
              <DataTable.Cell>{item.Result} </DataTable.Cell>
              <View style={{ flex: 2 }}>
                <DataTable.Cell>{item.Black}</DataTable.Cell>
              </View>
              <DataTable.Cell>{item.Year}</DataTable.Cell>
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
    </View>
  );
};

export default GamesTable;
