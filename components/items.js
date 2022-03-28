import * as React from "react";

//It shows the current items for the current team in a scrollable element

import { NativeBaseProvider, Box, Heading, VStack } from "native-base";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Home from "./HomeScreen";

import { background, borderLeft, style } from "styled-system";
import AddItem from "./AddTeam";
import AddTeamItems from "./AddItem";
import MainMenu from "./HomeScreen";

import { initializeApp } from "@firebase/app";
import "firebase/firestore";
import { getFirestore, setDoc, doc, deleteDoc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { Icon } from "native-base";
import { getAuth, updateEmail, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ScreenStack } from "react-native-screens";

const ItemsStack = createNativeStackNavigator();

function AddItemsScreen({ navigation }) {
  return <AddTeamItems />;
}

const Item = ({ color, name, quantity, size }) => (
  <Pressable
    style = {styles.flatlistStyle}
  >
    <View style={styles.item}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "column",
            flex: 7,
            marginVertical: 5,
          }}
        >
          <Text style={styles.itemNameText}>{name}</Text>
          <Text style={styles.body}>{color}</Text>
          <Text style={styles.body}>{size}</Text>
          {/* <Text style={styles.body}>{quantity}</Text> */}
        </View>
        <View
          style={{
            alignItems: "right",
            flex: 3,
            alignItems: "center",

            justifyContent: "center",
          }}
        >
          {/* <TouchableOpacity
            style={{ backgroundColor: "red", padding: 10 }}
            onPress={() => {
              console.log("deleting item");
            }}
          >
            <Text style={{ fontSize: 25, color: "white" }}>Delete</Text>
          </TouchableOpacity> */}
          <Text style = {styles.quantityText}>{quantity}</Text>
        </View>
      </View>
    </View>
  </Pressable>
);

const ViewItems = ({ route, navigation }) => {

  const testing = onSnapshot(doc(getFirestore(), "Teams", route.params.teamName), (doc) => {
    const backendItems = doc.data().Items
    setTeamItems(backendItems);
  });

  const [teamItems, setTeamItems] = useState();

  const renderItem = ({ item }) => (
    <Item
      color={item.Color}
      name={item.Name}
      quantity={item.Quantity}
      size={item.Size}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.GoBackInstructionsView}></View>
      <View style={styles.addItemView}>
        <Pressable
          style={styles.addItemButton}
          onPress={() =>
            navigation.navigate("AddItemsScreen", {
              screen: "AddTeamItem",
              params: { addTeamName: route.params.teamName },
            })
          }
        >
          <Text style={styles.addItemButtonText}>Add Item</Text>
        </Pressable>
      </View>

      {/* <Text>{"\n"}</Text> */}
      <FlatList
        data={teamItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default function ItemsNavigator({ navigation }) {
  return (
    <ItemsStack.Navigator initialRouteName="ViewItems">
      <ItemsStack.Screen
        name="ViewItems"
        component={ViewItems}
        options={{ headerShown: false }}
      />
      <ItemsStack.Screen name="Teams" component={MainMenu} />
      <ItemsStack.Screen
        name="AddItemsScreen"
        component={AddItemsScreen}
        options={{ headerShown: false }}
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
  },
  GoBackInstructionsView: {
    alignItems: "center",
    marginTop: 8,
    justifyContent: "center",
  },
  GoBackInstructionsText: {
    fontSize: 16,
    color: "grey",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  item: {
    backgroundColor: "#ff4545",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
    //marginHorizontal: 16,
    borderRadius: 8,
  },
  body: {
    fontSize: 16,
    paddingTop: 5,
    //margin: 5,
    //backgroundColor: "#eb34bd",
    color: "black",
    flex: 1,
    justifyContent: "space-between",
    textAlign: "left",
  },
  itemNameText: {
    fontSize: 20,
    fontWeight: "500",
    //paddingTop: 5,
    //margin: 5,
    //backgroundColor: "#eb34bd",
    color: "black",
    flex: 1,
    justifyContent: "space-between",
    textAlign: "left",
  },
  quantityText: {
    fontSize: 40,
    fontWeight: "700",
    color: "white",
  },
  flatlistStyle: {
    //padding: 8,
    marginHorizontal: 8,
  }
});
