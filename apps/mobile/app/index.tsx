import Codeit from "@repo/assets/images/codeit-resources.svg";
import CodeitLogo from "@repo/assets/images/codeit.svg";
import COLOR from "@repo/constants/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <CodeitLogo width={60} height={60} />
        <Codeit color={COLOR.gray[100]} width={194} height={24} />
      </View>
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
});
