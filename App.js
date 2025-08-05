import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';

//Object or blue print
const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <stack.Navigator>
          <stack.Screen  name = "HOME" component={HomeScreen}/>
          <stack.Screen  name = "About" component={AboutScreen} initialParams={{name : "Guest"}}/>
        </stack.Navigator>
    </NavigationContainer>
  );
}
