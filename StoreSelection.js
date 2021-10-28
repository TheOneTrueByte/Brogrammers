import React from "react";
import {
  Text,
  Heading,
  VStack,
  HStack,
  Button,
  IconButton,
  Icon,
  NativeBaseProvider,
  Center,
  Box,
  StatusBar,
} from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

const StoreSelection = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "red",
          flex: 1,
        }}
      >
        <NativeBaseProvider>
          <Box>
            <AppBar />
          </Box>
        </NativeBaseProvider>
      </View>

      <View
        style={{
          backgroundColor: "white",
          flex: 9,
        }}
      >
        <NativeBaseProvider>
          <Center flex={1} px="3">
            <Text isTruncated fontSize="6xl">
              Working on other stuff here
            </Text>
          </Center>
        </NativeBaseProvider>
      </View>
    </View>
  );
};

export default StoreSelection;

function AppBar() {
  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />

      <Box safeAreaTop backgroundColor="#6200ee" />

      <HStack
        bg="green"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space="4" alignItems="center">
          <IconButton
            icon={
              <Icon
                size="sm"
                as={<MaterialIcons name="menu" />}
                color="white"
              />
            }
          />
        </HStack>
        <HStack space="4" alignItems="center">
          <Text color="white" fontSize="20" fontWeight="bold">
            Stores
          </Text>
        </HStack>
        <HStack space="4">
          <IconButton
            icon={
              <Icon as={<AntDesign name="plus" />} size="sm" color="white" />
            }
          />
        </HStack>
      </HStack>
    </>
  );
}
