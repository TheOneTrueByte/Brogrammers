import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Inventory() {
  return (
    <View style={styles.inventory}>
      <Text>
        This page will allow the user to view and manage the inventory that has
        been recorded.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inventory: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
