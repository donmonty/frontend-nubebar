import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import Screen from "../components/Screen"
import ListItemBig from '../components/lists/ListItemBig'
import Button from '../components/Button';
import Icon2 from '../components/Icon2'
import Text from '../components/Text'
import colors from '../config/colors'

import { useDispatch, useSelector } from 'react-redux'
import { 
  getCountSummary, 
  setCountSummaryType, 
  closeCount } from '../store/actions/countActions'


const CountSummaryScreen = ({ navigation, route }) => {

  const [modalVisible, setModalVisible] = useState(false)

  const dispatch = useDispatch()
  const countSummaryData = useSelector(state => state.countSummary)
  const { countSummary, loading, error } = countSummaryData
  
  const countIdData = useSelector(state => state.countId)
  const { countId } = countIdData

  const countState = route.params.countState

  useEffect(() => {
    dispatch(getCountSummary(countId))
  }, [dispatch])

  const handleCloseCount = (countId) => {
    dispatch(closeCount({ countId: countId }))
    setModalVisible(!modalVisible)
    navigation.navigate("Count Confirmation", {
      confirmation: "countState",
      finishRoute: "Inventory Actions",
      screen: "Inspecciones"
    })
  }

  if (loading) return (
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
      <Button title="Regresar" onPress={() => navigation.navigate('Count List')}/>
    </Screen>
  )

  return (
    <Screen style={styles.container}>
      <View>
        <ListItemBig
          type = 'button-list'
          title="Contadas"
          subTitle="Botellas contadas"
          bottleQuantity={countSummary.botellas_contadas}
          onPress={() => {
            dispatch(setCountSummaryType('DONE'))
            navigation.navigate('Count Summary Details')
          }}
          IconComponent={
            <Icon2
              name="done-all"
              iconColor={colors.white}
              backgroundColor={colors.green}
            />
          }
        />
        
        <ListItemBig
          type = 'button-list'
          title="Pendientes"
          subTitle="Botellas pendientes de contar"
          bottleQuantity={countSummary.botellas_no_contadas}
          onPress={() => {
            dispatch(setCountSummaryType('PENDING'))
            navigation.navigate('Count Summary Details')
          }}
          IconComponent={
            <Icon2
              name="remove-done"
              iconColor={colors.white}
              backgroundColor={colors.red}
            />
          }
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
              name="clipboard-check"
              size={60}
            />
            <Text style={styles.alertText}>¿Cerrar la inspección?</Text>
          </View>
          <View style={{width: '100%'}}>
            <Button title="Cancelar" color="red" disabled={false} onPress={() => setModalVisible(!modalVisible)}/> 
            <Button 
              title="Cerrar Inspección" 
              disabled={false} 
              onPress={() => handleCloseCount(countId)}
            /> 
          </View>
        </View>
      </Modal> 
      <View>
        {(countState === 'ABIERTA') ? <Button title="Cerrar Inspección" color="red" onPress={() => setModalVisible(true)} /> : null}
        {(countState === 'ABIERTA') ? <Button title="Escanear Código QR" onPress={() => navigation.navigate('Count Scanner', { countId: countId })}/> : null}
      </View>
    </Screen>
  )
}

export default CountSummaryScreen

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
