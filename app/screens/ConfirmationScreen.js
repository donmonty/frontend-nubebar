import React from 'react'
import { StyleSheet, Image, View } from 'react-native'

import Screen from '../components/Screen';
import Button from '../components/Button';
import Text from '../components/Text'

import { useSelector } from 'react-redux'


const ConfirmationScreen = ({ navigation, route }) => {

  // The route contains a variable called "confirmation" we are gonna use 
  // to dynamically select the loading status from the state slice we want
  const stateData = useSelector(state => state[route.params.confirmation])
  const { loading, error } = stateData
  
  return (
    <Screen style={styles.container}>
      {
        (loading && !error) && 
        <> 
          <Text style={styles.alertText}>Loading...</Text>
        </>
      }
      {
        (!loading && !error) &&
        <>
          <View>
            <Image style={styles.icon} source={require("../../assets/check-outline.png")} />
            <Text style={styles.alertText}>Botella guardada con exito!</Text>
          </View>
          <Button title="Regresar" onPress={() => navigation.navigate('Inventory Actions')}/>
        </>
      }
      {
        (!loading && error) &&
        <>
          <View>
            <Image style={styles.icon} source={require("../../assets/alert-outline.png")} />
            <Text style={styles.alertText}  >Hubo un error. Intenta de nuevo.</Text>
          </View>
          <Button title="Regresar" onPress={() => navigation.navigate('Inventory Actions')}/>
        </>
      }
      
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