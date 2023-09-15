import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";

import GlobalStyles from "./GlobalStyles";

const VariantsList = ({
  moves = null,
  doMove = () => {},
  reverse = false,
  initItemsPerPage = 5,
}) => {
  if (moves == null) {
    return <View></View>;
  }

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([1, 2, 3, 4, 5, 10, 15, 25, 50]);
  const [itemsPerPage, onItemsPerPageChange] = useState(initItemsPerPage);

  let items = moves.map((move, index) => ({
    ...move,
    key: index,
  }));

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={GlobalStyles.table}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ruch</DataTable.Title>
          <DataTable.Title>gry</DataTable.Title>
          <DataTable.Title>%</DataTable.Title>
          <DataTable.Title>najnowsze</DataTable.Title>
        </DataTable.Header>
      </DataTable>

      {reverse
        ? items
            .slice(from, to)
            .map((item) => (
              <DataTable.Row
                key={item.key}
                onPress={() => {
                  doMove(item.move);
                }}
              >
                <DataTable.Cell>{item.move}</DataTable.Cell>
                <DataTable.Cell>{item.games}</DataTable.Cell>
                <DataTable.Cell>
                  {((item.points / item.games) * 100).toFixed(2)}
                </DataTable.Cell>
                <DataTable.Cell>{item.last}</DataTable.Cell>
              </DataTable.Row>
            ))
            .reverse()
        : items.slice(from, to).map((item) => (
            <DataTable.Row
              key={item.key}
              onPress={() => {
                doMove(item.move);
              }}
            >
              <DataTable.Cell>{item.move}</DataTable.Cell>
              <DataTable.Cell>{item.games}</DataTable.Cell>
              <DataTable.Cell>
                {((item.points / item.games) * 100).toFixed(2)}
              </DataTable.Cell>
              <DataTable.Cell>{item.last}</DataTable.Cell>
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

export default VariantsList;
