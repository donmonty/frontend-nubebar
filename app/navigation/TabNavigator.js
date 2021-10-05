import React from 'react';

import BottleActions from '../screens/BottleActions';
import Counts from '../screens/CountsScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();


function TabNavigator() {
  return(
    <Tab.Navigator>
      <Tab.Screen
        name="Acciones"
        tabBarLabel="Acciones"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="clipboard-flow-outline" color={color} size={36} />
          )
        }}
        component={BottleActions}
      />
      <Tab.Screen
        name="Conteos"
        tabBarLabel="Conteos"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="clipboard-check-outline" color={color} size={36} />
          )
        }}
        component={Counts}
      />
    </Tab.Navigator>
  );
}


export default TabNavigator;