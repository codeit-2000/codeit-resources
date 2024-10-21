import Codeit from "@repo/assets/images/codeit-resources.svg";
import CodeitLogo from "@repo/assets/images/codeit.svg";
import COLOR from "@repo/constants/constants/colors";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <CodeitLogo width={60} height={60} />
        <Codeit color={COLOR.gray[100]} width={194} height={24} />
      </View>

      <Link href="/dashboard" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>대시보드로 이동</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
    gap: 19,
    width: 200,
    height: 104,
    marginHorizontal: "auto",
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
