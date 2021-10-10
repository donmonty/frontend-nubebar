import React, { useState } from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import * as Yup from "yup"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import Screen from "../components/Screen"
import Button from '../components/Button'
import Text from '../components/Text'
import colors from '../config/colors'

import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";

import { useDispatch } from 'react-redux'
import { updateBottleWeight, updateBottleState } from '../store/actions/countActions'

const validationSchema = Yup.object().shape({
  weight: Yup.number().required().positive().integer().max(5000).label("Bottle Weight"),
});


const CountWeightScreen = ({ navigation, route }) => {

  const [modalVisible, setModalVisible] = useState(false)
  const [bottleStatus, setBottleStatus] = useState(null)

  const countId = route.params.countId
  const bottleCountId = route.params.bottleCountId

  const dispatch = useDispatch()

  const handleSubmit = ({ weight }) => {
    const payload = {
      item_inspeccion: bottleCountId, 
      peso_botella: weight, 
      estado: bottleStatus
    }
    dispatch(updateBottleWeight(payload))
    navigation.navigate('Count Confirmation')
  }

  const handleUpdateBottleState = () => {
    const payload = {
      item_inspeccion: bottleCountId,
      estado: bottleStatus
    }
    dispatch(updateBottleState(payload))
  }

  return (
    
    <Screen
      style={styles.container}
    >
      <View>
        <Form
          initialValues={{ weight: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="bottle-wine"
            keyboardType="number-pad"
            name="weight"
            placeholder="Ingresa el peso"
            
          />
          <SubmitButton title="Guardar Peso" />
        </Form>
      </View>
      
      <View>
        <Button 
          title="Vacía" 
          color="red" 
          onPress={() => {
            setModalVisible(true)
            setBottleStatus('0')
          }} 
        />
        <Button 
          title="Nueva" 
          color="green"
          onPress={() => {
            setModalVisible(true)
            setBottleStatus('2')
          }} 
        />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={{alignItems: 'center', paddingTop: 40}}>
            <MaterialCommunityIcons
              color={colors.primary}
              name={(bottleStatus === '0') ? "bottle-wine-outline" : "bottle-wine"}
              size={60}
            />
            <Text style={styles.alertText}>
              {(bottleStatus === '0') ? "¿Registrar botella vacía?" : "¿Registrar botella nueva?"}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Button title="Cancelar" color="red" disabled={false} onPress={() => setModalVisible(!modalVisible)}/> 
            <Button 
              title="Registrar" 
              disabled={false} 
              onPress={() => {
                handleUpdateBottleState()
              }}
            /> 
          </View>
        </View>
      </Modal> 

    </Screen>
  )
}

export default CountWeightScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 6,
  },
  alertText: {
    alignSelf: "center",
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: 'space-between',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%'
  },
})
