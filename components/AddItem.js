import * as React from "react";

import { NativeBaseProvider, Box, Heading, VStack, Select } from "native-base";
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
import { useState, useEffect } from "react";

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
import ItemsNavigator from "./items";

import { initializeApp } from "@firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
  Firestore,
  ref,
  collection,
  query,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { Icon } from "native-base";
import {
  getAuth,
  updateEmail,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase";

const AnotherStack = createNativeStackNavigator();
const firestore = getFirestore();


//this will essentially be a form
//that will prompt the user for
//the name, color, and quantity
//of a new item
const AddTeamItem = ({ route, navigation }) => {
  const [itemName, editItemName] = useState(""); //Used for purposes of editingItemName
  const [itemQuantity, editItemQuantity] = useState(""); //Used for purposes of editingItemQuantity
  const [itemSize, editItemSize] = useState(""); //Used for purposes of editingItemSize
  const [itemColor, editItemColor] = useState(""); //Used for purposes of editingItemColor

  // Error message
  const [err, setErr] = useState("");

  // Use effect for clear up error message
  useEffect(() => {
    setErr("");
  }, [itemName, itemQuantity, itemSize, itemColor]);
  const AddItemToDatabase = async () => {
    if (
      itemName.length > 0 &&
      itemQuantity.length > 0 &&
      itemSize.length > 0 &&
      itemColor.length > 0
    ) {
      //Item Creation
      const item = {
        Name: itemName,
        Quantity: itemQuantity,
        Size: itemSize,
        Color: itemColor,
        TeamName: route.params.addTeamName,
      };

      //Attempting to write item to firestore
      try {
        const currentTeamDoc = doc(firestore, "Teams", route.params.addTeamName)
        await updateDoc(currentTeamDoc, {
            Items: arrayUnion(item)
        });
        await alert("Item successfully added!")
        editItemName("");
        editItemQuantity("");
        editItemSize("");
        editItemColor("");
        console.log("added team to database");
      } catch {
        alert(
          "Can't add item. This could be a problem with your connection"
        );
        console.log("database write failed");
      }

    } else {
      setErr("Please complete every field!!!");
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.GoBackInstructionsView}>
        <Text style={styles.GoBackInstructionsText}>
          Team Name: {route.params.addTeamName}
        </Text>
      </View>
      <Box safeArea flex={10} py="2" w="90%" mx="auto">
        <VStack space={3} mt="5">
          <Heading size="lg" fontWeight="600" color="coolGray.800">
            This is the page that will allow you to create new Items
          </Heading>

          <ScrollView style = {styles.addItemsScrollView}>
            <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
              Item Name*
            </Heading>
            <TextInput
              required
              onChangeText={(value) => editItemName(value)}
              placeholder={"Please enter name of the item"}
              value={itemName}
              style={styles.input}
            />
            <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
              Item Quantity*
            </Heading>
            <TextInput
              required
              onChangeText={(value) => editItemQuantity(value)}
              placeholder={"Please enter the quantity"}
              value={itemQuantity}
              style={styles.input}
            />
            <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
              Item Size*
            </Heading>
            <TextInput
              required
              onChangeText={(value) => editItemSize(value)}
              placeholder={"Please enter size"}
              value={itemSize}
              style={styles.input}
            />
            <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
              Item Color*
            </Heading>
            <TextInput
              required
              onChangeText={(value) => editItemColor(value)}
              placeholder={"Please enter color"}
              value={itemColor}
              style={styles.input}
            />
            <Text
              style={{
                color: "#bf0b23",
                fontWeight: "bold",
              }}
            >
              {err}
            </Text>
          </ScrollView>

          <Button
            title="Add Item"
            onPress={() => {
              AddItemToDatabase();
              console.log("adding item to database...");
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

export default function AddTeamItems({ navigation })
{
  return (
    <AnotherStack.Navigator 
      initialRouteName="AddTeamItem"
    >
      <AnotherStack.Screen 
        name = "AddTeamItem"
        component = {AddTeamItem}
        options = {{ headerShown: false, }}
      />
    </AnotherStack.Navigator>
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
  addItemsScrollView: {
    flexGrow: 0
  },
  input: {
    height: 44,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    marginBottom: 10,
  },
});
