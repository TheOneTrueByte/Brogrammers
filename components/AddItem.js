import { Center } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, SafeAreaView, Alert } from 'react-native';

export default function AddItem({ submitHandler }) {
    const [text, setText] = useState('');

    const changeHandler = (val) => {
        setText(val);
    };
    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!text.trim()) {
          alert('Please Enter Team Name');
          return;
        }else{
            submitHandler(text);
            return;
        }
    }
    return (
        <>
            <TextInput

                multiline
                numberOfLines={3}
                style={styles.input}
                placeholder='Tap to enter a new team name'
                onChangeText={changeHandler}

            />
            <Button 
            
            onPress={checkTextInput} title="Add Team" color='red' 
            
            />
        </>
    )
}

const styles = StyleSheet.create({
    input: {

        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 500,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});