import * as React from "react";
import StoreSelection from "./StoreSelection";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
  View,
} from "native-base";

const Login = () => {
  return (
    <NativeBaseProvider>
      <Box>
        <Center flex={1} px="3">
          <Image
            source={require("./assets/Logo.png")}
            width="700px"
            height="200px"
          />
        </Center>
      </Box>
      <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{
                color: "coolGray.800",
                fontSize: "xs",
                fontWeight: 500,
              }}
            >
              Email ID
            </FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "coolGray.800",
                fontSize: "xs",
                fontWeight: 500,
              }}
            >
              Password
            </FormControl.Label>
            <Input type="password" />
            <Link
              _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500" }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="red" _text={{ color: "white" }}>
            Sign in
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

export default Login;
