import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LocationsScreen from '../screens/LocationsScreen';
import StorageAreas from '../screens/StorageAreas';
import TabNavigator from './TabNavigator';
import AddBottleNavigator from './AddBottleNavigator';
import CountNavigator from './CountNavigator'
import AnalyticsNavigator from './AnalyticsNavigator'

import colors from '../config/colors';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.white,
      }}
    >
      <Stack.Screen name="Sucursales" component={LocationsScreen}/>
      <Stack.Screen name="Almacenes" component={StorageAreas}/>
      <Stack.Screen name="Inventory Actions" options={{ title: 'Operaciones' }} component={TabNavigator}/>
      <Stack.Screen name="Add Bottle" options={{headerShown: false }} component={AddBottleNavigator} />
      <Stack.Screen name="Counts" options={{headerShown: false }} component={CountNavigator} />
      <Stack.Screen name="Analytics" options={{headerShown: false }} component={AnalyticsNavigator} />
    </Stack.Navigator>  
  );
}