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

import { style } from "styled-system";
import AddItem from "./AddItem";



function Stores() {
  const [items, setItems] = useState([
    { name: 'Store 1', key: '1' },
    { name: 'Store 2', key: '2' },
    { name: 'Store 3', key: '3' },
    { name: 'Store 4', key: '4' },
  ]);

  const pressHandler = (key) => {
    setItems((prevItems) => {
      return prevItems.filter(item => item.key != key);
    })
  }

  const submitHandler = (name) => {
    setItems((prevItems) => {
      return [
        { name: name, key: Math.random().toString() },
        ...prevItems
      ];
    })
  }
  return (
    <>

      <SafeAreaView style={styles.container}>
        <FlatList

          data={items}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.name}</Text>
          )}
        >

        </FlatList>
        <AddItem
          submitHandler={submitHandler} />
      </SafeAreaView>


    </>
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
    flex: 1,
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
});

export default StoreSelection;
