import React from 'react';

import BottleActions from '../screens/BottleActions';
import Counts from '../screens/CountsScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


function TabNavigator() {
  return(
    <Tab.Navigator>
      <Tab.Screen
        name="Acciones"
        tabBarLabel="Acciones"
        component={BottleActions}
      />
      <Tab.Screen
        name="Conteos"
        tabBarLabel="Conteos"
        component={Counts}
      />
    </Tab.Navigator>
  );
}


export default TabNavigator;