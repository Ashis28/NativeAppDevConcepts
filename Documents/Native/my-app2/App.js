import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import DashboardScreen from './Screens/DashboardScreen';
import SettingsScreen from './Screens/SettingsScreen';


const Drawer = createDrawerNavigator();

export default function App(){

  return (
    <NavigationContainer>
      <Drawer.Navigator>

        <Drawer.Screen name="DashboardScreen" component={DashboardScreen}/>
        <Drawer.Screen name="SettingsScreen" component={SettingsScreen}/>

      </Drawer.Navigator>
    </NavigationContainer>
  );
}