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
import { NavigationContainer } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";

import { background, borderLeft, style } from "styled-system";
import AddItem from "./AddTeam";

import { initializeApp } from "@firebase/app";
import "firebase/firestore";
import { getFirestore, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { Icon } from "native-base";
import { getAuth, updateEmail, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function ViewItems({ navigation }) {
    const [teamItems, setTeamItems] = useState("");

    return (
        <Text>this is where the teams's items  will be</Text>
    )
}