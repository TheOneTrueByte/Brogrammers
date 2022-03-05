import * as React from "react";

//This page is the homescreen for the app
//It shows the current teams in a scrollable element

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
import { createDrawerNavigator, DrawerItem, getDrawerStatusFromState } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";

import { background, borderLeft, get, style } from "styled-system";
import AddItem from "./AddTeam";

import { initializeApp } from "@firebase/app";
import firebase from 'firebase/app';
import "firebase/firestore";
import { getFirestore, setDoc, doc, deleteDoc, Firestore, collection, query, getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Icon } from "native-base";
import { getAuth, updateEmail, signOut } from "firebase/auth";
import { auth } from "../firebase";
const Separator = () => (
  <View style={styles.separator} />
);

const firestore = getFirestore();

//Main Menu & Teams Functionality
function MainMenu() {
  const [items, setItems] = useState("");
  const teamCol = collection(firestore, 'Teams');
  const q = query(teamCol);

  //used to get live data from FIrebase
  const getTeams = async () => {
    const teams = [];
    const querySnapshot = await getDocs(teamCol);
      querySnapshot.forEach((doc) => {
        teams.push({ name: doc.data().Name, key: Math.random().toString() });
      });
      return teams;
  }

  const pressHandler = (item) => {
    //alert that confirms the user wants to cancel the selected team
    if (Platform.OS === 'android') {
      Alert.alert(
        "Confirm Team Deletion",
        `Are you sure you want to delete ${item.name} from the database?`,
        [
          {
            text: "No",
            onPress: () => console.log("Deletion cancelled"),
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => {
              setItems((prevItems) => {

                deleteDoc(doc(firestore, "Teams", item.name));

                return prevItems.filter((thisItem) => thisItem.key != item.key);
              });
            }
          }
        ]
      )
    }
    else if (Platform.OS === 'ios') {
      Alert.alert(
        "Confirm Team Deletion",
        `Are you sure you want to delete ${item.name} from the database?`,
        [
          {
            text: "No",
            onPress: () => console.log("Deletion cancelled"),
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => {
              setItems((prevItems) => {

                deleteDoc(doc(firestore, "Teams", item.name));

                return prevItems.filter((thisItem) => thisItem.key != item.key);
              });
            }
          }
        ]
      )
    }
    else {
      setItems((prevItems) => {

        deleteDoc(doc(firestore, "Teams", item.name));

        return prevItems.filter((thisItem) => thisItem.key != item.key);
      });
    }
  };

  const submitHandler = (name) => {
    setItems((prevItems) => {
      try {
        setDoc(doc(firestore, "Teams", name), {
          Name: name
        });

        return [{ name: name, key: Math.random().toString() }, ...prevItems];
      }
      catch {
        alert("Can't add team. This is likely because a team with the same name already exists");
      }
    });
  };

  
  const DeleteItem = ({ item, pressHandler }) => {
    return (
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => pressHandler(item)}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Delete</Text>
      </TouchableOpacity>
    );
  };
  let teamNames = [];
(async function(){
  let its = await getTeams();
  setTimeout(() => {
    setItems(its);
  }, 1000);
   
})();


  return (
    <SafeAreaView style={styles.container}>
      <AddItem submitHandler={submitHandler} />
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
    </SafeAreaView>
  )
}


//Edit Current User Section
function EditCurrentUser({ navigation }) {

  const changeEmailAddress = async () => {
    try {
      //Figure out how to change the email address here
      await updateEmail(getAuth().currentUser, userEmail.toString());
      await alert("Your Email address has successfully been updated! You will be signed out now");
      await editUserEmail('');
      await navigation.navigate('Login');
    } catch (error) {
      console.log(error.message);
      editUserEmail('');
      alert("Uh-Oh. Something went wrong. Your email was not changed. This may mean you have to have a recent login. Attempt to logout and then back in again.");
    }
  };

  const [userEmail, editUserEmail] = useState('') //Used for purposes of resetting the email address

  return (
    <NativeBaseProvider>
      <Box safeArea flex={10} py="2" w="90%" mx="auto">
        <VStack space={3} mt="5">
          <Heading size="lg" fontWeight="600" color="coolGray.800">
            Your current email address is {getAuth().currentUser.email}
          </Heading>
          <TextInput
            onChangeText={value => editUserEmail(value)}
            placeholder={"Enter a new email"}
            value={userEmail}
          />
          <Button
            title="Change the Current User Email"
            onPress={() => {
              changeEmailAddress();
            }}
            mt="2"
            colorScheme="red"
            _text={{ color: "white" }}
          >
            Change Email
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

//Logout Section
function LogOut({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={async () => {
          try {
            signOut(auth);
          }
          catch (err) {
            Alert.alert('There is something wrong!', err.message);
          }
          finally {
            navigation.navigate('Login');
          }
        }}
        title="Log Out Now"
      />
    </View>
  );
}

//Other Settings Functionality
function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        onPress={() => {

          alert('This feature has yet to be implemented.');
        }}
        title="Change Password"
      />
      <Text>Setting Screen</Text>
    </View>
  );
}



const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName='MainMenu'
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'red',
        },
        drawerLabelStyle: {
          color: 'white',
        },
      }}
    >
      <Drawer.Screen
        name='Main Menu'
        component={MainMenu}
        options={{ drawerLabel: 'Main Menu' }}
      />
      <Drawer.Screen
        name='Edit Current User'
        component={EditCurrentUser}
        options={{ drawerLabel: 'Edit Current User' }}
      />
      <Drawer.Screen
        name='Settings'
        component={Settings}
        options={{ drawerLabel: 'Settings' }}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogOut}
        options={{ drawerLabel: "LogOut" }}
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