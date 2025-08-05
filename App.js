import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View , Platform } from 'react-native';
import { Button, TextInput } from 'react-native-web';

export default function App() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    // 1. Create an empty object to store errors
    let errors = {};
  
    // 2. Check if username is empty
    if (!userName) {
      errors.userName = "Username is required"; // Add error if empty
    }
  
    // 3. Check if password is empty
    if (!password) {
      errors["password"] = "Password is required"; // Add error if empty
    }
  
    // 4. Update the component's error state
    setErrors(errors);
  
    // 5. Return true if no errors (empty object), false if errors exist
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setUserName("");
      setPassword("");
      setErrors({});
    }
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100} style={styles.container}>

      <View style={styles.formContainer}>

        <Text style={styles.label}>UserName</Text>

        <TextInput
          style={styles.input}
          value={userName}
          placeholder='Enter your UserName'
          onChangeText={setUserName}
        />
        {errors.userName ? (
          <Text style={styles.errorText}>{errors.userName}</Text>
        ) : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder='Enter your password'
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        <Button title="Login" onPress={handleSubmit} />

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    padding: 5,
    fontWeight: "bold"
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },

  errorText: {
    color: "red",
    margin: 2,
  }
});
