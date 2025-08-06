//paste in app.js to run drawer navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import DashboardScreen from './Screens/DashboardScreen';
import SettingsScreen from './Screens/SettingsScreen';

// Rename the navigator variable to avoid conflict with the component name
const DrawerNavigator = createDrawerNavigator();

export const AboutDrawer = () => {
  return (
    <DrawerNavigator.Navigator>
      <DrawerNavigator.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          title: "MyDashboard",
          drawerLabel: "DashboardLabel",
          drawerActiveTintColor: "#333",
          drawerActiveBackgroundColor: "lightBlue"
        }}
      />
      <DrawerNavigator.Screen name="SettingsScreen" component={SettingsScreen} />
    </DrawerNavigator.Navigator>
  );
};

// Keep both AboutDrawer and a default export, but avoid naming conflict
export default function Drawer() {
  return (
    <NavigationContainer>
      <AboutDrawer />
    </NavigationContainer>
  );
}