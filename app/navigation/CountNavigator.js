import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import CountList from '../screens/CountListScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen'
import CountSummaryScreen from '../screens/CountSummaryScreen'
import CountScanQrScreen from '../screens/CountScanQrScreen'
import CountBottleDetailsScreen from '../screens/CountBottleDetailsScreen'
import CountWeightScreen from '../screens/CountWeightScreen'
import CountManualIdScreen from '../screens/CountManualIdScreen'
import CountSummaryDetailsScreen from '../screens/CountSummaryDetailsScreen'
import CountListBottlesScreen from '../screens/CountListBottlesScreen'

const Stack = createStackNavigator();

export default function CountNavigator() {
  return (

    <Stack.Navigator
      screenOptions={{
        title: "Inspecciones"
      }}
    >
      <Stack.Screen name='Count List' component={CountList} />
      <Stack.Screen name='Count Summary' component={CountSummaryScreen} />
      <Stack.Screen name='Count Scanner' component={CountScanQrScreen} />
      <Stack.Screen name='Count Manual Id' component={CountManualIdScreen} />
      <Stack.Screen name='Count Bottle Details' options={{headerShown: false }} component={CountBottleDetailsScreen} />
      <Stack.Screen name='Count Weight' component={CountWeightScreen} />
      <Stack.Screen name='Count Confirmation' options={{headerShown: false }} component={ConfirmationScreen} />
      <Stack.Screen name='Count Summary Details' component={CountSummaryDetailsScreen} />
      <Stack.Screen name='Count List Bottles' component={CountListBottlesScreen} />
    </Stack.Navigator>
  )
}

