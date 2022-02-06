import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function About() {
  return (
    <View style={styles.about}>
      <Text>
        This application is intended for the purposes of logging and managing
        inventory at Soccer Post. Special thanks goes to Anthony Do, Jorge
        Guzman, Raymond Mullikin, Juan Sanchez, and Nhan Dang.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  about: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
