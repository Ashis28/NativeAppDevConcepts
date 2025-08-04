import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , SafeAreaView , TextInput } from 'react-native';
import { useState } from 'react';
export default function App() {

  let [name,setName] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <TextInput style = {styles.input} value={name} onChangeText={setName} placeholder='email@gama.com' ></TextInput>
      <Text>Hello mr : {name} </Text>
      
      <TextInput style = {[styles.input,styles.multiline]} placeholder='write a message' multiline></TextInput>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight,
  },
  input : {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1, 
  },

  multiline: {
    minHeight: 100,
    textAlignVertical:"top", 
  }
});
