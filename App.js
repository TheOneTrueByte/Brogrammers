// import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./Login";
import StoreSelection from "./StoreSelection";
import {
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  IconButton,
  Icon,
  NativeBaseProvider,
  Center,
  Box,
  StatusBar,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
  return (
    // <View>
    //   <Login />
    // </View>
    <View style={styles.container}>
      <StoreSelection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
