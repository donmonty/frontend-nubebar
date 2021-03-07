import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ActionsScreen from '../screens/ActionsScreen';
import InventoryActionsNavigator from './InventoryActionsNavigator';
// import routes from "./routes";
import navigation from "./rootNavigation";
import colors from '../config/colors';

const Stack = createStackNavigator();

const ActionsNavigator = () => {
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
        name="Acciones"
        component={ActionsScreen}
      />

      <Stack.Screen
        name="Movimientos"
        component={InventoryActionsNavigator}
      />
    
    </Stack.Navigator>
  );
}

export default ActionsNavigator;


