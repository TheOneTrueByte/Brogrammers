import * as React from "react";

import { NativeBaseProvider, Box, Heading, VStack } from "native-base";
import {
  Button,
  View,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { useState } from "react";
import {
  createDrawerNavigator,
  DrawerItem,
  getDrawerStatusFromState,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import {
  background,
  borderLeft,
  get,
  createStyleFunction,
  style,
} from "styled-system";
import AddItem from "./AddTeam";
import ItemsNavigator from "./Items"

import { initializeApp } from "@firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
  Firestore,
  collection,
  query,
  getDocs,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { Icon } from "native-base";
import { getAuth, updateEmail, signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import { auth } from "../firebase";


//this will essentially be a form 
//that will prompt the user for
//the name, color, and quantity
//of a new item
export default function AddTeamItem({ navigation }) {

  const [itemName, editItemName] = useState(""); //Used for purposes of editingItemName
  const [itemQuantity, editItemQuantity] = useState(""); //Used for purposes of editingItemQuantity
  const [itemSize, editItemSize] = useState(""); //Used for purposes of editingItemSize
  const [itemColor, editItemColor] = useState(""); //Used for purposes of editingItemColor

  const AddItemToDatabase = async () => {

  }

  return (
    <NativeBaseProvider>
      <View style = {styles.GoBackInstructionsView}>
        <Text style = {styles.GoBackInstructionsText}>
            Swipe right on mobile to go back to all teams  
        </Text>  
      </View>
      <Box safeArea flex={10} py="2" w="90%" mx="auto">
        <VStack space={3} mt="5">
          <Heading size="lg" fontWeight="600" color="coolGray.800">
            This is the page that will allow you to create new Items
          </Heading>
          <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
              Item Name
          </Heading>
          <TextInput
            onChangeText={(value) => editItemName(value)}
            placeholder={"Name"}
            value={itemName}
            style={styles.input}
          />
          <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
              Item Quantity
          </Heading>
          <TextInput
            onChangeText={(value) => editItemQuantity(value)}
            placeholder={"Quantity"}
            value={itemQuantity}
            style={styles.input}
          />
          <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
              Item Size
          </Heading>
          <TextInput
            onChangeText={(value) => editItemSize(value)}
            placeholder={"Size"}
            value={itemSize}
            style={styles.input}
          />
          <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
              Item Color
          </Heading>
          <TextInput
            onChangeText={(value) => editItemColor(value)}
            placeholder={"Password"}
            value={itemColor}
            style={styles.input}
          />
          <Button
            title="Add Item"
            onPress={() => {
              AddItemToDatabase();
            }}
            mt="2"
            colorScheme="red"
            _text={{ color: "white" }}
          >
            Add New Item
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  GoBackInstructionsView: {
    alignItems: "center",
    margin: 8,
  },
  GoBackInstructionsText: {
    fontSize: 16,
    color: "grey",
    alignItems: "center",
    textAlign: "center",
  },
  input: {
    height: 44,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    marginBottom: 10,
  },
})