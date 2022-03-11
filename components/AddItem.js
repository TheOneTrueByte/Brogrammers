import { Center } from "native-base";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
  View,
  Text,
  Pressable
} from "react-native";


//this will essentially be a form 
//that will prompt the user for
//the name, color, and quantity
//of a new item
export default function AddTeamItem({ navigation }) {
  return (
    <SafeAreaView>
      <View style = {styles.GoBackInstructionsView}>
        <Text style = {styles.GoBackInstructionsText}>
          Swipe right to go back to all items  
        </Text>  
      </View>
      <Text>This is where new items are created</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  GoBackInstructionsView: {
    alignItems: "center",
    margin: 8,
  },
  GoBackInstructionsText: {
    fontSize: 16,
    color: "grey",
    alignItems: "center",
  },
})