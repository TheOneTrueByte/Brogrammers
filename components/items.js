import * as React from "react";

//It shows the current items for the current team in a scrollable element

import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
} from "native-base";
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
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";

import { background, borderLeft, style } from "styled-system";
import AddItem from "./AddTeam";
import AddTeamItem from "./AddItem";

import { initializeApp } from "@firebase/app";
import "firebase/firestore";
import { getFirestore, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { Icon } from "native-base";
import { getAuth, updateEmail, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ScreenStack } from "react-native-screens";

const ItemsStack = createNativeStackNavigator();

function AddItemsScreen({ navigation }) {
  return <AddTeamItem />
}


function ViewItems({ navigation }) {
    const [teamItems, setTeamItems] = useState("");

    return (
        <SafeAreaView style = { styles.container }>
            <View style = {styles.addItemView}>
              <Pressable 
                style = {styles.addItemButton}
                onPress={() => navigation.navigate("AddItemsScreen")}
              >
                <Text style = {styles.addItemButtonText} >Add Item</Text>
              </Pressable> 
            </View>
          <Text>this is where the teams's items will be</Text>
        </SafeAreaView>
    );
}

export default function ItemsNavigator({ navigation })
{
  return (
    <ItemsStack.Navigator 
      initialRouteName="ViewItems"
      //screenOptions={{ gestureEnabled: false }}
    >
      <ItemsStack.Screen 
        name = "ViewItems"
        component = {ViewItems}
        options = {{ headerShown: false, }}
      />
      <ItemsStack.Screen 
        name = "AddItemsScreen"
        component = {AddItemsScreen}
        options = {{ headerShown: false, }}
      />
    </ItemsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  addItemView: {
    padding: 8,
    borderRadius: 8,
  },
  addItemButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ff4545",
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  addItemButtonText: {
    fontSize: 16,
    color: "white",
  }
})