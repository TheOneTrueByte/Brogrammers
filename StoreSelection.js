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
} from "react-native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login";
import { style } from "styled-system";


function Stores() {
  const DATA = [
    {
      id: '1',
      title: 'Store 1',
    },
    {
      id: '2',
      title: 'Store 2',
    },
    {
      id: '3',
      title: 'Store 3',
    }
  ]
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button
        title="Press me"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
    </SafeAreaView>
  );
}

function TeamAndStorage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Team and Storage screen</Text>
    </View>
  );
}

function Inventory() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Inventory</Text>
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

function LogOut() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>LogOut Screen</Text>
    </View>
  );
}

function About() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>About Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Stores"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "red",
        },
        drawerLabelStyle: {
          color: "white",
        },
      }}
    >
      <Drawer.Screen
        name="Stores"
        component={Stores}
        options={{ drawerLabel: "Stores" }}
      />
      <Drawer.Screen
        name="TeamAndStorage"
        component={TeamAndStorage}
        options={{ drawerLabel: "TeamAndStorage" }}
      />
      <Drawer.Screen
        name="Inventory"
        component={Inventory}
        options={{ drawerLabel: "Inventory" }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{ drawerLabel: "Settings" }}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogOut}
        options={{ drawerLabel: "LogOut" }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{ drawerLabel: "About" }}
      />
    </Drawer.Navigator>
  );
}

function StoreSelection() {
  return <MyDrawer />;
}

const styles = StyleSheet.create({
  container: {

    paddingTop: 40,
    paddingHorizontal: 20,

  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
  },
  title: {
    fontSize: 32,
  },
});

export default StoreSelection;
