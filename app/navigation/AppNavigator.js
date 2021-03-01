import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LocationsScreen from '../screens/LocationsScreen';
import ActionsScreen from '../screens/ActionsScreen';
// import routes from "./routes";
import navigation from "./rootNavigation";
import colors from '../config/colors';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return(
    <Stack.Navigator
      screenOptions={{
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
        name="ActionsScreen"
        component={LocationsScreen}
      />
    
    </Stack.Navigator>
  );
}

export default AppNavigator;


