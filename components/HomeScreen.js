import * as React from "react";

//This page is the homescreen for the app
//It shows the current teams in a scrollable elements

import { NativeBaseProvider, Box, Heading, VStack } from "native-base";
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
import {
  createDrawerNavigator,
  DrawerItem,
  getDrawerStatusFromState,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import {
  background,
  borderLeft,
  get,
  createStyleFunction,
  style,
} from "styled-system";
import AddItem from "./AddTeam";
import ItemsNavigator from "./items"
import AddTeamItem from "./AddItem";

import { initializeApp } from "@firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
  Firestore,
  collection,
  query,
  getDocs,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { Icon } from "native-base";
import { getAuth, updateEmail, signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react/cjs/react.production.min";
const Separator = () => <View style={styles.separator} />;

const Stack = createNativeStackNavigator();

function ItemsScreen({ navigation }) {
  return <ItemsNavigator />;
}

const firestore = getFirestore();

//Main Menu & Teams Functionality
function MainMenu({ navigation }) {
  const [items, setItems] = useState("");
  const [temp, setTemp] = useState("");
  const [flag, setFlag] = useState(true);
  const teamCol = collection(firestore, "Teams");
  const q = collection(firestore, "Teams");

  //used to delete and fetch
  const deleteTeamBackEnd = async (teamname) => {
    await deleteDoc(doc(firestore, "Teams", teamname));
    await manualGetTeams();
  };

  //used to add and fetch
  const addTeamBackEnd = async (teamname) => {
    await setDoc(doc(firestore, "Teams", teamname), {
      Name: teamname,
    });

    await manualGetTeams();
  };

  //used to get live data from firebase manually
  const manualGetTeams = async () => {
    const teams = [];
    const snap = await getDocs(teamCol);
    snap.forEach((doc) => {
      teams.push({ name: doc.data().Name, key: Math.random().toString() });
    });
    console.log("This is a manual team fetch");
    setFlag(false)
    await setTemp(teams);
  };

  //used to get live data from Firebase
  const getTeams = async () => {
    const teams = [];
    const querySnapshot = await getDocs(teamCol);
    querySnapshot.forEach((doc) => {
      teams.push({ name: doc.data().Name, key: Math.random().toString() });
    });
    console.log("Automatic team fetch");
    await setTemp(teams);
    return teams;
  };

  const pressHandler = (item) => {
    //alert that confirms the user wants to cancel the selected team
    if (Platform.OS === "android") {
      Alert.alert(
        "Confirm Team Deletion",
        `Are you sure you want to delete ${item.name} from the database?`,
        [
          {
            text: "No",
            onPress: () => console.log("Deletion cancelled"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              setItems((prevItems) => {
                //deleteDoc(doc(firestore, "Teams", item.name));
                deleteTeamBackEnd(item.name);
                //manualGetTeams();

                return prevItems.filter((thisItem) => thisItem.key != item.key);
              });
            },
          },
        ]
      );
    } else if (Platform.OS === "ios") {
      Alert.alert(
        "Confirm Team Deletion",
        `Are you sure you want to delete ${item.name} from the database?`,
        [
          {
            text: "No",
            onPress: () => console.log("Deletion cancelled"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              setItems((prevItems) => {
                deleteTeamBackEnd(item.name);

                return prevItems.filter((thisItem) => thisItem.key != item.key);
              });
            },
          },
        ]
      );
    } else {
      setItems((prevItems) => {
        deleteTeamBackEnd(item.name);

        return prevItems.filter((thisItem) => thisItem.key != item.key);
      });
    }
  };

  const submitHandler = (name) => {
    setItems((prevItems) => {
      try {
        addTeamBackEnd(name);

        return [{ name: name, key: Math.random().toString() }, ...prevItems];
      } catch {
        alert(
          "Can't add team. This is likely because a team with the same name already exists"
        );
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

  //Refresh FlatList
  (async function () {
    let its = temp;
    if (flag) {
      manualGetTeams();
      setFlag(false);
    }
    setTimeout(() => {
      setItems(its);
    }, 2000);
  })();



  return (
    <SafeAreaView style={styles.container}>
      <AddItem submitHandler={submitHandler} />
      <View style={styles.GoToItemsInstructionsView}>
        <Text style={styles.GoToItemsInstructions}>
          {'\n'}Tap on a team to view and edit its items{'\n'}
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: '#2196f3', height: 50, width: 1000, padding: 15, alignItems: 'center' }}
          onPress={() => {
            manualGetTeams();
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Pressable
            style={styles.flatListStyle}
            onPress={() => navigation.navigate('TeamItems', { screen: 'ViewItems', params: { teamName: item.name }, })}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 24 }}>{item.name}</Text>
            </View>
            <DeleteItem item={item} pressHandler={pressHandler} />
          </Pressable>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

function MainMenuNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Teams"
    //screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Teams"
        component={MainMenu}
      />
      <Stack.Screen
        name="TeamItems"
        component={ItemsScreen}
        options = {{title: "Items"}}
      />
    </Stack.Navigator>
  );
}

//Edit Current User Section
function EditCurrentUser({ navigation }) {
  const [userEmail, editUserEmail] = useState(""); //Used for purposes of resetting the email address
  const [userPassword, editUserPassword] = useState(""); //Used for purposes of resetting the password address

  //function for changing the users email address
  const changeEmailAddress = async () => {
    try {
      if (userEmail.length < 1) {
        alert("Box is empty. Enter a valid email address");
      } else {
        await updateEmail(getAuth().currentUser, userEmail.toString());
        await alert(
          "Your Email address has successfully been updated! You will be signed out now"
        );
        await editUserEmail("");
        await navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error.message);
      editUserEmail("");
      alert("Uh-Oh. Something went wrong. Your email was not changed.");
    }
  };

  const changePassword = async () => {
    try {
      if (userPassword.length < 3) {
        alert("Your Password is too short. Enter in a longer password");
      } else {
        await updatePassword(getAuth().currentUser, userPassword.toString());
        await alert(
          "Your Password address has successfully been updated! You will be signed out now"
        );
        await editUserPassword("");
        await navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error.message);
      editUserPassword("");
      alert(
        "Uh-Oh. Something went wrong. Your password was not changed. This may mean you have to have a recent login. Attempt to logout and then back in again."
      );
    }
  };

  return (
    <NativeBaseProvider>
      <Box safeArea flex={10} py="2" w="90%" mx="auto">
        <VStack space={3} mt="5">
          <Heading size="lg" fontWeight="600" color="coolGray.800">
            Your current email address is {getAuth().currentUser.email}
          </Heading>
          <TextInput
            onChangeText={(value) => editUserEmail(value)}
            placeholder={"Enter a new email"}
            value={userEmail}
            style={styles.input}
          />
          <Button
            title="Change Email"
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
      <Box safeArea flex={10} py="2" w="90%" mx="auto">
        <VStack space={3} mt="5">
          <Heading size="lg" fontWeight="600" color="coolGray.800">
            Your current password is... Just kidding. No one can see your
            password
          </Heading>
          <TextInput
            onChangeText={(value) => editUserPassword(value)}
            placeholder={"Enter a new password"}
            value={userPassword}
            style={styles.input}
          />
          <Button
            title="Change Password"
            onPress={() => {
              changePassword();
            }}
            mt="2"
            colorScheme="red"
            _text={{ color: "white" }}
          >
            Change Password
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

//Logout Section
function LogOut({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={async () => {
          try {
            signOut(auth);
          } catch (err) {
            Alert.alert("There is something wrong!", err.message);
          } finally {
            navigation.navigate("Login");
          }
        }}
        title="Log Out Now"
      />
    </View>
  );
}

//Other Settings Functionality
function DeleteAccount({ navigation }) {

  const [accountEmail, editAccountEmail] = useState(""); //Used for purposes of verifying password change
  const [accountPassword, editAccountPassword] = useState(""); //Used for purposes of verifying password change
  //Your current email address is {getAuth().currentUser.email}
  const deleteAccountAction = async () => {

    const user = getAuth().currentUser;
    const credential = EmailAuthProvider.credential(
      accountEmail,
      accountPassword
    )

    reauthenticateWithCredential(user, credential).then(async () => {

      deleteUser(user);

      await alert(
        "Your account has been deleted."
      );
      await editAccountEmail("");
      await editAccountPassword("");
      await navigation.navigate("Login");
    }).catch((error) => {
      alert("Can't verify user. Your account has NOT been deleted");
    });
  };

  return (
    <NativeBaseProvider>

      <Box safeArea flex={10} py="2" w="90%" mx="auto">
        <VStack space={3} mt="5">
          <Heading size="lg" fontWeight="600" color="coolGray.800">
            Warning! Continuing on this page will delete your account. Please speak with a manager first!
          </Heading>
          <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
            Please enter your credentials
          </Heading>
          <TextInput
            onChangeText={(value) => editAccountEmail(value)}
            placeholder={"Email"}
            value={accountEmail}
            style={styles.input}
          />
          <TextInput
            onChangeText={(value) => editAccountPassword(value)}
            placeholder={"Password"}
            value={accountPassword}
            style={styles.input}
          />
          <Button
            title="Delete Account"
            onPress={() => {
              deleteAccountAction();
            }}
            mt="2"
            colorScheme="red"
            _text={{ color: "white" }}
          >
            Delete Account
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="MainMenu"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "red",
        },
        drawerLabelStyle: {
          color: "white",
        },
        title: "",
        swipeEdgeWidth: 0,
      }}
    >
      <Drawer.Screen
        name="Main Menu"
        component={MainMenuNavigator}
        options={{ drawerLabel: "Main Menu" }}
      />
      <Drawer.Screen
        name="Edit Current User"
        component={EditCurrentUser}
        options={{ drawerLabel: "Edit Current User" }}
      />
      <Drawer.Screen
        name="Delete Account"
        component={DeleteAccount}
        options={{ drawerLabel: "Delete Account" }}
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
    justifyContent: "center",
    padding: 5,
  },
  container: {
    flex: 1,
    padding: 5,
  },
  button: {
    flex: 1,
    backgroundColor: "#ff4545",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  flatListStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ff4545",
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: "#ff4545",
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  GoToItemsInstructionsView: {
    alignItems: "center",
    marginBottom: 8,
  },
  GoToItemsInstructions: {
    fontSize: 16,
    color: "grey",
    alignItems: "center",
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
  input: {
    height: 44,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    marginBottom: 10,
  },
});
