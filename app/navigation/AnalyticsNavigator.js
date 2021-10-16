import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import YieldReportsScreen from '../screens/analytics/YieldReportsScreen'

const Stack = createStackNavigator()


export default function AnalyticsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Reportes"
      }}
    >
      <Stack.Screen name='Yield Reports' component={YieldReportsScreen} />
    </Stack.Navigator>
  )
}