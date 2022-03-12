import { Center, keyboardDismissHandlerManager } from "native-base";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
  View,
  Text,
  Pressable,
  Keyboard
} from "react-native";


export default function AddItem({ submitHandler }) {
  const [text, setText] = useState("");

  const checkTextInput = () => {

    Keyboard.dismiss();

    //Check for the Name TextInput
    if (!text.trim()) {
      alert("Please Enter Team Name");
      return;
    } else {
      submitHandler(text);
      setText('');
      return;
    }
  };
  return (
    <>
    <View style = {styles.view}>
      <TextInput
          multiline
          numberOfLines={3}
          style={styles.input}
          placeholder="Tap to enter a new team name"
          onChangeText={value => setText(value)}
          value={text}
      />
    </View>
      <Pressable 
          onPress={checkTextInput}
          style = {styles.AddTeamButton}
      >
        <View>
          <Text style = {styles.AddTeamText}>Add Team</Text>  
        </View>  
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ddd",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    marginBottom: 8,
    paddingHorizontal: 8,
    // paddingVertical: 500,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  view: {
    padding: 8,
    backgroundColor: "#ddd",
    borderRadius: 8,
    margin: 8,
  },
  AddTeamButton: {
    marginHorizontal: 8,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    borderRadius: 8,
    padding: 8,
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: "black",
  },  
  AddTeamButtonView: {
  },
  AddTeamText: {
    fontSize: 16,
    color: "red",
    alignItems: "center",
  },
});
