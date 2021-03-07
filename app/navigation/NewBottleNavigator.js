import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ScanBarcodeScreen from '../screens/ScanBarcodeScreen';
import BottleDetailsScreen from '../screens/BottleDetailsScreen';
// import InventoryActionsNavigator from './InventoryActionsNavigator';
// import routes from "./routes";
import navigation from "./rootNavigation";
import colors from '../config/colors';

const Stack = createStackNavigator();

const NewBottleNavigator = () => {
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
        name="Barcode"
        component={ScanBarcodeScreen}
      />

      <Stack.Screen
        name="Details"
        component={BottleDetailsScreen}
      />
    
    </Stack.Navigator>
  );
}

export default NewBottleNavigator;


