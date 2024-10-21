import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MeetingRooms = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>meeting-rooms</Text>
    </SafeAreaView>
  );
};

export default MeetingRooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
});
