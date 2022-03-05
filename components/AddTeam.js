import { Center } from "native-base";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
  View,
} from "react-native";

export default function AddItem({ submitHandler }) {
  const [text, setText] = useState("");
  const [textEntry, resetTextEntry] = useState('')

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!text.trim()) {
      alert("Please Enter Team Name");
      return;
    } else {
      submitHandler(text);
      resetTextEntry('');
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
          onChange={(event) => 
          {
              setText(event.target.value);
          }}
            onChangeText={value => resetTextEntry(value)}
            value={textEntry}
      />
    </View>
      <Button onPress={checkTextInput} title="Add Team" color="red"/>
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
});
