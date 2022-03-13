import * as React from "react";
import Home from "./HomeScreen";
//import ItemsNavigator from "./Items.js"
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Alert } from "react-native";
import { useState } from "react";
import { auth } from "../firebase";

import {
  Image,
  Center,
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
  AspectRatio,
} from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { signInWithEmailAndPassword } from "@firebase/auth";
import * as firebase from "../firebase";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return <Home />;
}

const LoginScreen = ({ navigation }) => {

  const loginUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        emailField,
        passwordField
      );
      editEmailField('');
      editPasswordField('');    
      navigation.navigate("Home");
    } catch (error) {
      console.log(error.message);
      editPasswordField('');  
      alert("Invalid Email/Password");
    }
  };

  const [emailField, editEmailField] = useState('')
  const [passwordField, editPasswordField] = useState('')
  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} pt="10" pb="0" w="90%" mx="auto">
        <Image
          justifyContent="center"
          alignItems="center"
          mx="auto"
          alt="Logo"
          style={{ width: 500, height: 100 }}
          source={require("../assets/SPLogo.jpg")}
        />
      </Box>
      <Box safeArea flex={10} py="2" w="90%" mx="auto">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <TextInput
            onChangeText={value => editEmailField(value)}
            placeholder={"Email"}
            value={emailField}
            style={loginstyles.input}
          />
          <TextInput
            onChangeText={value => editPasswordField(value)}
            placeholder={"Password"}
            value={passwordField}
            secureTextEntry={true}
            style={loginstyles.input}
          />
          <Button
            title="Go to StoreSelection"
            onPress={() => {
              loginUser();         
            }}
            mt="2"
            colorScheme="red"
            _text={{ color: "white" }}
          >
            Sign In
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              Don't have an account?{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              href="#"
            >
              Ask your employer
            </Link>
          </HStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

function Login() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const loginstyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    height: 44,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    marginBottom: 10,
  },
});

export default Login;
