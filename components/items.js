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

import { background, borderLeft, fontSize, style } from "styled-system";
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

function EditItemsScreen({ route, navigation }) {
  const { itemName, itemColor, itemQuantity, itemSize, itemID } = route.params;

  const [quantity, setQuantity] = useState(itemQuantity);
  const [name, setName] = useState(itemName);
  const [color, setColor] = useState(itemColor);
  const [size, setSize] = useState(itemSize);


  const increment = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decrement = () => setQuantity(prevQuantity => prevQuantity - 1);

  return (
    <View style = {styles.editItemsContainer} >
      <Text style = {styles.currentQuantityText } >Current Quantity: </Text>
      <View
        style = {styles.editItemsTextInputView}
      >
        <TextInput
          required
          value = {String(quantity)}
          keyboardType = "number-pad"
          returnKeyType = "done"
          style = {styles.editItemsQuantityTextInput}
          onChangeText = {setQuantity}
        />
      </View>
      <View 
        style = {{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Pressable onPress={decrement} >
          <View style = {styles.plusMinusButtons}>
            <Text style = {styles.plusMinusText } >-</Text>
          </View>
        </Pressable>
        <Pressable onPress={increment}>
          <View style = {styles.plusMinusButtons}>
            <Text style = {styles.plusMinusText } >+</Text>
          </View>
        </Pressable>
      </View>
      <View>
        <Text style = {styles.editItemText} >Edit Name:</Text>
        <TextInput
          style = {styles.EditItemsTextInput}
          onChangeText = {setName}
          placeholder = {name}
        />
        <Text style = {styles.editItemText} >Edit Color:</Text>
        <TextInput
          style = {styles.EditItemsTextInput}
          onChangeText = {setColor}
          placeholder = {color}
        />
        <Text style = {styles.editItemText} >Edit Size:</Text>
        <TextInput
          style = {styles.EditItemsTextInput}
          onChangeText = {setSize}
          placeholder = {size}
        />
      </View>
      <View>
        <Pressable style = {styles.saveDeleteButtonPlacement}>
          <View style = {styles.saveButton} >
            <Text 
              style = {{
                color: "#ff4545",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Save Item
            </Text>
          </View>
        </Pressable>
        <Pressable style = {styles.saveDeleteButtonPlacement}>
          <View style = {styles.deleteButton} >
            <Text
              style = {{
                color: "white",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Delete Item
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const Item = ({ navigation, color, name, quantity, size, id }) => (
  <Pressable
    style = {styles.flatlistStyle}
    onPress = {() => {navigation.navigate('EditItemsScreen', {itemName: name, itemColor: color, itemQuantity: quantity, itemSize: size, itemID: id})}}
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
          <Text style = {styles.quantityText}>{quantity}</Text>
        </View>
      </View>
    </View>
  </Pressable>
);

const NoItems = () => {
  return (
    <View style = {styles.NoItemsView} >
      <Text style = {styles.NoItemsText} >This team currently does not have any items.</Text>
    </View>
  )
}

const ViewItems = ({ route, navigation }) => {

  const testing = onSnapshot(doc(getFirestore(), "Teams", route.params.teamName), (doc) => {
    const backendItems = doc.data().Items
    setTeamItems(backendItems);
  });

  const [teamItems, setTeamItems] = useState();

  const renderItem = ({ item }) => (
    <Item
      navigation = {navigation}
      color={item.Color}
      name={item.Name}
      quantity={item.Quantity}
      size={item.Size}
      id = {item.Id}
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
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent = {NoItems}
        contentContainerStyle = {{flexGrow: 1}}
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
      <ItemsStack.Screen 
        name = "EditItemsScreen"
        component = {EditItemsScreen}
        options = {{ headerShown: false }}
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
  },

  currentQuantityText: {
    fontSize: 25,
    textAlign: "center",
    paddingTop: 10
  },
  editItemsContainer: {
    flex: 1,
  },
  editItemsTextInputView: {
    paddingTop: 12,
    alignItems: "center",
  },
  editItemsQuantityTextInput: {
    height: 110,
    width: 300,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 70,
    fontWeight: "600"
  },
  plusMinusButtons: {
    backgroundColor: "#ff4545",
    borderRadius: 15,
    margin: 10,
    width: 75,
    height: 50,
  },
  plusMinusText: {
    fontSize: 30,
    textAlign: "center",
  },
  EditItemsTextInput: {
    height: 44,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    marginBottom: 12,
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  editItemText: {
    marginHorizontal: 8,
    marginBottom: 4,
  },
  saveDeleteButtonPlacement: {
    alignItems: "center",
    paddingTop: 20,
  },
  saveButton: {
    backgroundColor: "white",
    //paddingHorizontal: 100,
    width: 275,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "grey",
    borderWidth: .5
  },
  deleteButton: {
    backgroundColor: "#ff4545",
    width: 275,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "grey",
    borderWidth: .5
  },
  NoItemsView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  NoItemsText: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#999999",
    fontWeight: "600",
  }
});
