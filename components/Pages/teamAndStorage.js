import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function TeamAndStorage() {
  return (
    <View style={styles.teamAndStorage}>
      <Text>
        This page will allow the user to be able to see and update the select
        teams and their storages.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  teamAndStorage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
