import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ScanBarcode from '../screens/ScanBarcodeScreen';
import ScanQrScreen from '../screens/ScanQrScreen';
import BottleDetailsScreens from '../screens/BottleDetailsScreen';
import WeightScreen from '../screens/WeightScreen'
import ConfirmationScreen from '../screens/ConfirmationScreen'
import ManualIdScreen from '../screens/ManualIdScreen'
import ManualBarcodeScreen from '../screens/ManualBarcodeScreen'

const Stack = createStackNavigator();

export default function AddBottleNavigator() {
  return(
    <Stack.Navigator
      screenOptions={{
        title: "Alta de Botella Nueva"
      }}
    >
      <Stack.Screen name='Manual Barcode' component={ManualBarcodeScreen} />
      <Stack.Screen name='Manual Folio' component={ManualIdScreen} />
      <Stack.Screen name="Scan Barcode" component={ScanBarcode}/>
      <Stack.Screen name="Scan QR" component={ScanQrScreen}/>
      <Stack.Screen name="Bottle Details" component={BottleDetailsScreens}/>
      <Stack.Screen name='Weight Bottle' component={WeightScreen} />
      <Stack.Screen name='Confirmation'options={{headerShown: false }} component={ConfirmationScreen} />
    </Stack.Navigator>  
  );
}