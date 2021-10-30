// import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./Login";

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
