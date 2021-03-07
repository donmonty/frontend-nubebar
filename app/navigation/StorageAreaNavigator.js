import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StorageAreasScreen from '../screens/StorageAreasScreen';
import TabActions from './TabActions'
import ActionsNavigator from './ActionsNavigator';
// import routes from "./routes";
import navigation from "./rootNavigation";
import colors from '../config/colors';

const Stack = createStackNavigator();

const StorageAreaNavigator = () => {
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
      <Stack.Screen
        name="StorageAreas"
        component={StorageAreasScreen}
      />

      <Stack.Screen
        name="Acciones"
        component={TabActions}
      />
    
    </Stack.Navigator>
  );
}

export default StorageAreaNavigator;


