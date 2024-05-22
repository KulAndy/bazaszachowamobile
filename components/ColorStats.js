import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";

import GlobalStyles from "./GlobalStyles";

const ColorStats = ({
  stats,
  colorFilter = () => {},
  setOpening = () => {},
}) => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([1, 2, 3, 4, 5, 10, 15, 25]);
  const [itemsPerPage, onItemsPerPageChange] = useState(3);

  const items = stats.map((stat, index) => ({
    ...stat,
    key: index,
  }));

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable style={GlobalStyles.table}>
      <DataTable.Header>
        <View style={{ flex: 3 }}>
          <DataTable.Title>Debiut</DataTable.Title>
        </View>
        <DataTable.Title>ilość</DataTable.Title>
        <DataTable.Title>%</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row
          key={item.key}
          onPress={() => {
            colorFilter();
            setOpening(item.opening);
          }}
        >
          <View style={{ flex: 3 }}>
            <DataTable.Cell>{item.opening}</DataTable.Cell>
          </View>
          <DataTable.Cell>{item.count}</DataTable.Cell>
          <DataTable.Cell>{item.percent}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={"Wierszy na stronę"}
      />
    </DataTable>
  );
};

export default ColorStats;
