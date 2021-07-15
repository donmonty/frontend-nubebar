import React from 'react';

import Screen from '../components/Screen';
import Text from '../components/Text';
import ListItem from '../components/lists/ListItem'

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// Main Function
//----------------------------------------------------------
export default function TestNav() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Almacenes" component={StorageAreas}/>
      <Stack.Screen name="Inventory Actions" component={TabNav}/>
      <Stack.Screen name="Add Bottle" options={{headerShown: false }} component={AddBottle} />
    </Stack.Navigator>  
  );
}

// Navigators
//------------------------------------------------------

function TabNav() {
  return(
    <Tab.Navigator>
      <Tab.Screen
        name="Acciones"
        tabBarLabel="Acciones"
        component={BottleActions}
      />
      <Tab.Screen
        name="Conteos"
        tabBarLabel="Conteos"
        component={Counts}
      />
    </Tab.Navigator>
  );
}

function AddBottle() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Scan Bottle" component={ScanBottle} />
      <Stack.Screen name="Bottle Details" component={BottleDetails} />
    </Stack.Navigator>
  );
}

// Screens
//------------------------------------------------------

function StorageAreas() {
  const navigation = useNavigation();
  return(
    <Screen style={{flex: 1}}>
      <ListItem
        type="button"
        title="Barra Principal"
        onPress={() => navigation.navigate('Inventory Actions', {screen: 'Acciones'})}
      />
    </Screen>
  );
}

function BottleActions() {
  const navigation = useNavigation();
  return(
    <Screen style={{flex: 1}}>
      <ListItem
        type="button"
        title="Alta de Botella Nueva"
        onPress={() => navigation.navigate('Add Bottle', {screen: 'Scan Bottle'})}
      />
    </Screen>
  );
}

function Counts() {
  return(
    <Screen>
      <Text>Counts Screen</Text>
    </Screen>
  );
}

function ScanBottle() {
  return(
    <Screen>
      <Text>Scan Bottle Screen</Text>
    </Screen>
  );
}

function BottleDetails() {
  return(
    <Screen>
      <Text>Bottle Details Screen</Text>
    </Screen>
  );
}

