import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LocationNavigator from './LocationNavigator'
import StorageAreasScreen from '../screens/StorageAreasScreen';
// import routes from "./routes";
import navigation from "./rootNavigation";
import colors from '../config/colors';

const Stack = createStackNavigator();

const AppNavigator = () => {
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
        component={LocationNavigator}
      />
      
    </Stack.Navigator>
  );
}

export default AppNavigator;


