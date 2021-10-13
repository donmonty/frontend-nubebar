import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import Screen from '../components/Screen';
import Button from '../components/Button';
import Text from '../components/Text'
import colors from '../config/colors'

import { useSelector } from 'react-redux'


const ConfirmationScreen = ({ navigation, route }) => {

  // The route contains a variable called "confirmation" that we are gonna use 
  // to dynamically select the state slice we want
  const stateData = useSelector(state => state[route.params.confirmation])
  const { loading, error } = stateData

  if (loading && !error) return (
    <Screen style={styles.container}>
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <MaterialCommunityIcons color={colors.primary} name="timer-sand" size={70} />
        <Text style={styles.alertText}>Cargando...</Text>
      </View>
    </Screen>
  )

  if (error) return (
    <Screen style={styles.container}>
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <MaterialIcons color={colors.red} name="error" size={70} />
        <Text style={styles.alertText}>Hubo un error. Intenta de nuevo.</Text>
      </View>
      <Button 
        title="Regresar" 
        onPress={() => navigation.navigate(route.params.finishRoute, { screen: route.params.screen || null })}
      />
    </Screen>
  )
  
  return (
    <Screen style={styles.container}>
      <View style={{alignItems: 'center', paddingTop: 40}}>
        <Ionicons
          color={colors.green}
          name="md-checkmark-circle"
          size={70}
        />
        <Text style={styles.alertText}>¡Operación exitosa!</Text>
      </View>
      <Button 
        title="Regresar" 
        onPress={() => navigation.navigate(route.params.finishRoute, { screen: route.params.screen || null })}/>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  },
  icon: {
    width: '100%',
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    resizeMode: 'contain',
  },
  alertText: {
    alignSelf: "center",
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24
  }
})

export default ConfirmationScreen