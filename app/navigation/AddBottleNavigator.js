import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ScanBarcode from '../screens/ScanBarcodeScreen';
import BottleDetailsScreens from '../screens/BottleDetailsScreen';

const Stack = createStackNavigator();

export default function AddBottleNavigator() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Scan Barcode" component={ScanBarcode}/>
      <Stack.Screen name="Bottle Details" component={BottleDetailsScreens}/>
    </Stack.Navigator>  
  );
}