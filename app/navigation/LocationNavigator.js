import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LocationsScreen from '../screens/LocationsScreen';
import StorageAreaNavigator from './StorageAreaNavigator';
import StorageAreasScreen from '../screens/StorageAreasScreen';
// import routes from "./routes";
import navigation from "./rootNavigation";
import colors from '../config/colors';

const Stack = createStackNavigator();

const LocationNavigator = () => {
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.white,
      }}
    >
      <Stack.Screen
        name="Locations"
        component={LocationsScreen}
      />
      <Stack.Screen
        name="StorageAreas"
        component={StorageAreaNavigator}
      />
    
    </Stack.Navigator>
  );
}

export default LocationNavigator;


