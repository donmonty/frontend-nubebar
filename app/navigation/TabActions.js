import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from "@expo/vector-icons";

import InventoryActionsNavigator from './InventoryActionsNavigator';
import InventoryActionsScreen from '../screens/InventoryActionsScreen';
import CountsScreen from '../screens/CountListScreen';
// import ActionsScreen from '../screens/ActionsScreen';
// import InventoryActionsNavigator from './InventoryActionsNavigator';
// import routes from "./routes";
// import navigation from "./rootNavigation";
import colors from '../config/colors';

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

const TabActions = () => {
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Acciones') {
            iconName = focused ? 'swap-horizontal-circle' : 'swap-horizontal-circle-outline';
          } else if (route.name === 'Conteos') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
          }
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />
        }
      })}
    tabBarOptions={{
      activeTintColor: colors.primary,
      inactiveTintColor: colors.gray['500']
    }} 
    >
      <Tab.Screen
        name="Acciones"
        tabBarLabel="Acciones"
        component={InventoryActionsNavigator}
      />

      <Tab.Screen
        name="Conteos"
        tabBarlabel="Conteos"
        component={CountsScreen}
      />
    
    </Tab.Navigator>
  );
}

export default TabActions;


