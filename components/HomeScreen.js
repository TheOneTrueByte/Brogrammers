import React, { useState } from "react";
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
  Pressable,
} from "react-native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";

import { background, borderLeft, style } from "styled-system";
import AddItem from "./AddItem";

import { initializeApp } from "@firebase/app";
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { Icon } from "native-base";

const Separator = () => (
  <View style={styles.separator} />
);

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
const firestore = getFirestore();

function MainMenu() {
  return(
    <ScrollView style = {styles.container}>
      <View style = {styles.layout}>
        <Pressable 
          style = {styles.button}
          title = "Teams"
        >
          <Text style = {styles.text} >Team 1</Text>
        </Pressable>
      </View>
      <View style = {styles.layout}>
        <Pressable 
          style = {styles.button}
          title = "Teams"
        >
          <Text style = {styles.text} >Team 2</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

function LogOut({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Login')}
        title="Log Out Now"
      />
    </View>
  );
}

function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Setting Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return(
    <Drawer.Navigator
      initialRouteName = 'MainMenu'
      screenOptions = {{
        drawerStyle: {
          backgroundColor: 'red',
        },
        drawerLabelStyle: {
          color: 'white',
        },
      }}
    >
      <Drawer.Screen 
        name = 'Main Menu'
        component = {MainMenu}
        options = {{drawerLabel: 'Main Menu'}}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogOut}
        options={{ drawerLabel: "LogOut" }}
      />
      <Drawer.Screen 
        name = 'Settings'
        component = {Settings}
        options = {{drawerLabel: 'Settings'}}
      />
    </Drawer.Navigator>  
  );
}

export default function Home() {
  return <MyDrawer />;
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  container: {
    flex: 1,
    padding: 5,
  },
  button: {
    flex: 1,
    backgroundColor: '#ff4545',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});