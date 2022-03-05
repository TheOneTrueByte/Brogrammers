import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";

import AddItem from "./AddTeam";

import { initializeApp } from "@firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// Pages
import Inventory from "./Pages/inventory";
import About from "./Pages/about";
import TeamAndStorage from "./Pages/teamAndStorage";
import Settings from "./Pages/settings";

const Separator = () => <View style={styles.separator} />;

const firebaseConfig = {
  apiKey: "AIzaSyCml_AxQYdLee-QUAR3CYw83w914zbTsuU",
  authDomain: "soccer-inventory-ab9f4.firebaseapp.com",
  projectId: "soccer-inventory-ab9f4",
  storageBucket: "soccer-inventory-ab9f4.appspot.com",
  messagingSenderId: "204772762321",
  appId: "1:204772762321:web:e31691245d98cc84381bf0",
  measurementId: "G-EBZ53PWMLN",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore();

function Stores() {
  const [items, setItems] = useState("");

  const pressHandler = (key) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.key != key);
    });
  };

  const submitHandler = (name) => {
    setItems((prevItems) => {
      return [{ name: name, key: Math.random().toString() }, ...prevItems];
    });
  };

  const DeleteItem = ({ item, pressHandler }) => {
    return (
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => pressHandler(item.key)}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Delete</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.flatListStyle}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 24 }}>{item.name}</Text>
              </View>
              <DeleteItem item={item} pressHandler={pressHandler} />
            </View>
          )}
        ></FlatList>
        <AddItem submitHandler={submitHandler} />
      </SafeAreaView>
    </>
  );
}

function LogOut({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.navigate("Login")} title="LogOut Now" />
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
    padding: 24,
    // paddingTop: 40,
    // paddingHorizontal: 20,
  },
  flatListStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "pink",
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: "pink",
    fontSize: 24,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: "pink",
    fontSize: 24,
  },
  btnStyle: {
    backgroundColor: "#140d94",
    padding: 20,
    borderRadius: 8,
  },
});

export default StoreSelection;
