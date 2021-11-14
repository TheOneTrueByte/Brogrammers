// import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./Login";
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyCml_AxQYdLee-QUAR3CYw83w914zbTsuU",
  authDomain: "soccer-inventory-ab9f4.firebaseapp.com",
  projectId: "soccer-inventory-ab9f4",
  storageBucket: "soccer-inventory-ab9f4.appspot.com",
  messagingSenderId: "204772762321",
  appId: "1:204772762321:web:e31691245d98cc84381bf0",
  measurementId: "G-EBZ53PWMLN"
}

const app = initializeApp(firebaseConfig);

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
