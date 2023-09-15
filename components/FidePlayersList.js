import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";
import GlobalStyles from "./GlobalStyles";
import FidePlayer from "./FidePlayer";

const FidePlayersList = ({ players }) => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState(
    Array.from({ length: 3 }, (_, i) => i + 1)
  );
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const items = players.map((player, index) => ({
    ...player,
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
        <DataTable.Title>Zawodnik</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>
            <View>
              <FidePlayer player={item} />
            </View>
          </DataTable.Cell>
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

export default FidePlayersList;
