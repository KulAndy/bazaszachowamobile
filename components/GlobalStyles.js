import { StyleSheet } from "react-native";
import ColorScheme from "./ColorScheme";

const basicText = { color: ColorScheme.textColor, textAlign: "center" };

const GlobalStyles = StyleSheet.create({
  h1: {
    ...basicText,
    fontSize: 48,
    fontWeight: "bold",
  },
  h2: {
    ...basicText,
    fontSize: 36,
    fontWeight: "bold",
  },
  text: {
    ...basicText,
    fontSize: 24,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: ColorScheme.backgroundColor,
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
  },
  smallText: {
    ...basicText,
    fontSize: 16,
  },
  table: {
    backgroundColor: ColorScheme.tableBg,
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#87CEFA",
    color: "#000",
  },
});

export default GlobalStyles;
