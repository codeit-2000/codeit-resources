import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Seats = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>seats</Text>
    </SafeAreaView>
  );
};

export default Seats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
});
