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
import "firebase/firestore";
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { Icon } from "native-base";

const Separator = () => (
  <View style={styles.separator} />
);

const firestore = getFirestore();


function MainMenu() {
  const [items, setItems] = useState("");

  const pressHandler = (key) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.key != key);
    });
  };

  const submitHandler = (name) => {
    setItems((prevItems) => {

      setDoc(doc(firestore, "Teams", name), {
          Name: name
      });

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


  return(
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
          <AddItem submitHandler={submitHandler}/>
      </SafeAreaView>


      
  )
}

function LogOut({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => {
          navigation.navigate('Login');
          try {
                  firebase.auth().signOut();
              } 
              catch (err) 
              {
                  Alert.alert('There is something wrong!', err.message);
              }
          }}
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
  flatListStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#ff4545',
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: '#ff4545',
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  btnStyle: {
    backgroundColor: "#140d94",
    padding: 20,
    borderRadius: 8,
  },
});