import COLOR from "@repo/constants/constants/colors";
import { Link } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>dashboard</Text>
      <Link href="/" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>홈화면으로 이동</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  button: {
    backgroundColor: COLOR.purple[60],
    padding: 16,
    borderRadius: 8,
    width: "80%",
    textAlign: "center",
    margin: 24,
  },

  buttonText: {
    color: COLOR.gray[0],
  },
});
