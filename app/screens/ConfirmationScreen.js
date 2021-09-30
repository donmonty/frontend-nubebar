import React from 'react'
import { StyleSheet, Image, View } from 'react-native'

import Screen from '../components/Screen';
import Button from '../components/Button';
import Text from '../components/Text'
//import LottieView from 'lottie-react-native'

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
          <Text>Loading...</Text>
          {/* <LottieView 
            source={require("../../assets/loading.json")} 
          /> */}
        </>
      }
      {
        (!loading && !error) &&
        <>
          {/* <LottieView 
            source={require("../../assets/check.json")}
            style={{ width: 200, height: 200 }} 
          /> */}
          <Image style={styles.icon} source={require("../../assets/check-outline.png")} />
          <Text>Botella guardada con exito!</Text>
          <Button title="Regresar" onPress={() => navigation.navigate('Inventory Actions')}/>
        </>
      }
      {
        (!loading && error) &&
        <>
          <View>
            <Image style={styles.icon} source={require("../../assets/alert-outline.png")} />
            <Text style={{ alignSelf: "center", marginTop: 20 }}  >Hubo un error. Intenta de nuevo.</Text>
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
})

export default ConfirmationScreen