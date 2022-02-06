import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Settings() {
  return (
    <View style={styles.settings}>
      <Text>
        This page will allow the user to change certain settings depending on
        permission levels.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
