import { NavigationContainer } from "@react-navigation/native";
import CourseScreen from "./Screens/CourseScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { Ionicons } from '@expo/vector-icons';
const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");


const Tab = createBottomTabNavigator();


export default function App(){


  return(
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: "below-icon",
          tabBarShowLabel: true,
          tabBarActiveBackgroundColor: "purple",
          tabBarActiveTintColor:"green"
        }}
      >
          <Tab.Screen name="Course" component={CourseScreen}/>
          <Tab.Screen name="settings" component={SettingsScreen}/>
          <Tab.Screen name="Profile" component={ProfileScreen}
          options={{
            tabBarLabel: "MyProfile",
            tabBarIcon: ({color}) => <Ionicons name="person" size={20} color={color}/>,
            tabBarBadge: 3
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}