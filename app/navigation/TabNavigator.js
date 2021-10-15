import React from 'react';

import BottleActions from '../screens/BottleActions';
import CountActions from '../screens/CountActions';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();


function TabNavigator() {
  return(
    <Tab.Navigator
      screenOptions={{ tabBarLabelPosition: "beside-icon" }}
    >
      <Tab.Screen
        name="Acciones"
        tabBarLabel="Movimientos"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="clipboard-flow-outline" color={color} size={24} />
          )
        }}
        component={BottleActions}
      />
      <Tab.Screen
        name="Inspecciones"
        tabBarLabel="Inspecciones"
        tabBarLabelPosition="beside-icon"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="clipboard-check-outline" color={color} size={24} />
          )
        }}
        component={CountActions}
      />
    </Tab.Navigator>
  );
}


export default TabNavigator;