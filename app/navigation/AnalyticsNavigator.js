import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import YieldReportsScreen from '../screens/analytics/YieldReportsScreen'
import YieldReportSummaryScreen from '../screens/analytics/YieldReportSummaryScreen'
import YieldDetailsScreen from '../screens/analytics/YieldDetailsScreen'

const Stack = createStackNavigator()


export default function AnalyticsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Reportes"
      }}
    >
      <Stack.Screen name='Yield Reports' component={YieldReportsScreen} />
      <Stack.Screen name='Yield Report Summary' component={YieldReportSummaryScreen} />
      <Stack.Screen name='Yield Details' component={YieldDetailsScreen} />
    </Stack.Navigator>
  )
}