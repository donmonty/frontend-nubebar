import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ScanBarcode from '../screens/ScanBarcodeScreen';
import ScanQrScreen from '../screens/ScanQrScreen';
import BottleDetailsScreens from '../screens/BottleDetailsScreen';

const Stack = createStackNavigator();

export default function AddBottleNavigator() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Scan Barcode" component={ScanBarcode}/>
      <Stack.Screen name="Scan QR" component={ScanQrScreen}/>
      <Stack.Screen name="Bottle Details" component={BottleDetailsScreens}/>
    </Stack.Navigator>  
  );
}