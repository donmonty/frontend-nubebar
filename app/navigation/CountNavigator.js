import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import CountList from '../screens/CountListScreen';

const Stack = createStackNavigator();

export default function CountNavigator() {
  return (

    <Stack.Navigator
      screenOptions={{
        title: "Inspecciones"
      }}
    >
      <Stack.Screen name='Count List' component={CountList} />
    </Stack.Navigator>
  )
}

