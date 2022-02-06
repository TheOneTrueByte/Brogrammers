import { Center } from "native-base";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";

export default function AddItem({ submitHandler }) {
  const [text, setText] = useState("");

  const changeHandler = (val) => {
    setText(val);
  };
  return (
    <>
      <TextInput
        multiline
        numberOfLines={3}
        style={styles.input}
        placeholder="new item..."
        onChangeText={changeHandler}
      />
      <Button
        onPress={() => submitHandler(text)}
        title="Add Item"
        color="red"
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
