import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//import CountsScreen from '../screens/CountsScreen';
import InventoryActionsScreen from '../screens/InventoryActionsScreen';
import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';
import NewBottleNavigator from './NewBottleNavigator';
// import routes from "./routes";
import navigation from "./rootNavigation";
import colors from '../config/colors';

const Stack = createStackNavigator();

const InventoryActionsNavigator = () => {
  return(
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.white,
      }}
    >
      <Stack.Screen
        name="Acciones"
        component={InventoryActionsScreen}
      />
      <Stack.Screen
        name="Barcode"
        component={ScanBarcodeScreen}
      />
      <Stack.Screen
        name="Alta Botella"
        component={NewBottleNavigator}
      />
    
    </Stack.Navigator>
  );
}

export default InventoryActionsNavigator;


