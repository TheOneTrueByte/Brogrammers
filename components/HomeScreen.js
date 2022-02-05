import React, { useState } from "react";
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
  ScrollView,
} from "react-native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";

import { style } from "styled-system";
import AddItem from "./AddItem";

import { initializeApp } from "@firebase/app";
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { Icon } from "native-base";
