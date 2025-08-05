import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';
import { Pressable } from 'react-native';

//Object or blue print
const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <stack.Navigator>
          <stack.Screen  name = "HOME" component={HomeScreen}
          options={{
            title : "welcome home",
            headerStyle : {backgroundColor : "#6a51ae"}, // fixed: added # for hex color
            headerTintColor: "#fff",
            headerTitleStyle: {fontWeight:"bold"},

            headerRight: () => (
              <Pressable onPress={()=>alert("Menu pressed")}>
                <Text style={{color:"#fff" , fontSize:16 , padding:5 }}>Menu</Text>
              </Pressable>
            ),
              
            contentStyle:{
              backgroundColor: "#e8e4f3"
            }
          }}/>
          <stack.Screen  name = "About" component={AboutScreen} initialParams={{name : "Guest"}}/>
        </stack.Navigator>
    </NavigationContainer>
  );
}
