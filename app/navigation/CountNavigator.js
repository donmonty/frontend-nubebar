import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import CountList from '../screens/CountListScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen'

const Stack = createStackNavigator();

export default function CountNavigator() {
  return (

    <Stack.Navigator
      screenOptions={{
        title: "Inspecciones"
      }}
    >
      <Stack.Screen name='Count List' component={CountList} />
      <Stack.Screen name='Confirmation' options={{headerShown: false }} component={ConfirmationScreen} />
    </Stack.Navigator>
  )
}

