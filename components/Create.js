import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

const Create = () => {
  const [teamName, setTeamName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [customerName, setCustomerName] = useState("John Doe");

  return (
    <View
      style={{
        margin: 20,
        marginTop: 100,
      }}
    >
      <TextInput
        required
        placeholder="Enter name of the team"
        onChange={(e) => {
          setTeamName(e);
        }}
        style={{
          borderWidth: 2,
          borderColor: "skyblue",
          margin: 20,
        }}
      />
      <TextInput
        required
        placeholder="Enter quantity"
        onChange={(e) => {
          setQuantity(e);
        }}
        style={{
          borderWidth: 2,
          borderColor: "skyblue",
          margin: 20,
        }}
      />
      <TextInput
        required
        placeholder="Enter customer's name"
        onChange={(e) => {
          setCustomerName(e);
        }}
        style={{
          borderWidth: 2,
          borderColor: "skyblue",
          margin: 20,
        }}
      />
      <Button
        title="submit"
        onPress={() => {
          console.log(teamName + " " + quantity + " " + customerName);
        }}
      />
    </View>
  );
};

export default Create;
