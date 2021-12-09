import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View, Image, Modal } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import ListItem from '../components/lists/ListItem'
import ListItemSeparator from '../components/lists/ListItemSeparator'
import Button from '../components/Button'
import Text from '../components/Text'

import colors from '../config/colors';
import cache from '../utility/cache'
import { 
  listQuickCounts, 
  listTotalCounts, 
  createQuickCount, 
  createTotalCount, 
  setCountActive, 
  setCountId,
  setCountState } from '../store/actions/countActions';

import { useDispatch, useSelector } from 'react-redux'

const CountListScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false)

  const dispatch = useDispatch()
  
  const quickCountsData = useSelector(state => state.quickCounts)
  const { quickCounts, error: errorQuickCounts, loading: loadingQuickCounts } = quickCountsData

  const totalCountsData = useSelector(state => state.totalCounts)
  const { totalCounts, error: errorTotalCounts, loading: loadingTotalCounts } = totalCountsData
  
  const countTypeData = useSelector(state => state.countType)
  const { countType } = countTypeData

  const countActiveData = useSelector(state => state.countActive)
  const { countActive } = countActiveData

  useEffect(() => {
    (async function requestCounts() {
      const storageAreaId = await cache.get('Almacen')
      if (countType === 'DIARIA') {
        dispatch(listQuickCounts(storageAreaId))
      } else {
        dispatch(listTotalCounts(storageAreaId))
      }
    })()
  }, [dispatch])

  const handleCreateCount =  async () => {
    const storageAreaId = await cache.get('Almacen')
    const locationId = await cache.get('Sucursal')
    const payload = {
      almacen: storageAreaId,
      sucursal: locationId,
      tipo_inspeccion: countType
    }
    if (countType === 'DIARIA') {
      dispatch(createQuickCount(payload))
    } else {
      dispatch(createTotalCount(payload))
    }
    setModalVisible(!modalVisible)
    navigation.navigate('Count Confirmation', { 
      confirmation: (countType === 'DIARIA') ? 'quickCountCreate' : 'totalCountCreate',
      finishRoute: 'Inventory Actions',
      screen: 'Inspecciones'
    })
  }

  if (loadingQuickCounts || loadingTotalCounts) return (
    <Screen style={styles.container}>
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <MaterialCommunityIcons color={colors.primary} name="timer-sand" size={70} />
        <Text style={styles.alertText}>Cargando...</Text>
      </View>
    </Screen>
  )

  if((countType === 'DIARIA' && errorQuickCounts) || (countType === 'TOTAL' && errorTotalCounts)) return (
    <Screen style={styles.container}>
      <View style={{padding: 40}}>
      <MaterialIcons color={colors.red} name="error" size={70} />
        <Text style={styles.alertText}>Hubo un problema. Por favor intenta de nuevo.</Text>
      </View>
      <Button title="Regresar" onPress={() => navigation.navigate('Inventory Actions', { screen: 'Inspecciones' })}/>
    </Screen>
  )

  return (
    <Screen style={styles.container}>
      
      <FlatList
        data={(countType === "DIARIA") ? quickCounts : totalCounts}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(count) => count.id.toString()}
        renderItem={({item}) => (
          <ListItem
            title={item.fecha_alta}
            onPress={() => {
              dispatch(setCountId(item.id))
              dispatch(setCountState(item.estado))
              navigation.navigate('Count Summary')
              // navigation.navigate('Count Summary', { countState: item.estado })
            }} 
          />
        )}
      />

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
              name={(countType === 'DIARIA') ? "lightning-bolt" : "all-inclusive"}
              size={60}
            />
            <Text style={styles.alertText}>
              {(countType === 'DIARIA') ? "¿Crear una nueva inspección rápida?" : "¿Crear una nueva inspección total?"}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Button title="Cancelar" color="red" disabled={false} onPress={() => setModalVisible(!modalVisible)}/> 
            <Button 
              title="Crear Inspección" 
              disabled={false} 
              onPress={() => handleCreateCount()}
            /> 
          </View>
        </View>
      </Modal> 

      {(countType === 'DIARIA') ? <Button title="Nueva Inspección Rápida" disabled={countActive} onPress={() => {
        setModalVisible(true)
        dispatch(setCountActive(true))
      }}/> : null}
      {(countType === 'TOTAL') ? <Button title="Nueva Inspección Total" disabled={countActive} onPress={() => {
        setModalVisible(true)
        dispatch(setCountActive(true))
      }}/> : null}

    </Screen>
  )
}

export default CountListScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 6,
    justifyContent: 'space-between'
  },
  containerError: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  },
  alertText: {
    alignSelf: "center",
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24
  },
  icon: {
    width: '100%',
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    resizeMode: 'contain',
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
