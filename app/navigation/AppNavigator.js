import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StorageScreen from '../screens/StorageScreen';
import ActionsScreen from '../screens/ActionsScreen';
// import routes from "./routes";
import navigation from "./rootNavigation";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="Storage"
        component={StorageScreen}
      />
      <Stack.Screen
        name="ActionsScreen"
        component={ActionsScreen}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;


