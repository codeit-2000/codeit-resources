import Constants from "expo-constants";
import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const Equipments = () => {
  return (
    <WebView
      style={styles.container}
      source={{ uri: "https://dev.resource.codeit.kr/" }}
    />
  );
};

export default Equipments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
