import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Modal } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"

import Screen from "../../components/Screen"
import ListItemSeparator from '../../components/lists/ListItemSeparator'
import Button from '../../components/Button'
import Text from '../../components/Text'
import ListItemData from '../../components/lists/ListItemData'
import ListItemDataHeader from '../../components/lists/ListItemDataHeader'

import colors from '../../config/colors'
import titleCase from '../../utility/titleCase'

import { getYieldBottleData } from '../../store/actions/yieldActions'
import { useDispatch, useSelector } from 'react-redux'

function filterBottleData(bottleData, folio) {
  return bottleData.filter(item => item.folio === folio)[0]
}


export default function YieldBottleDataScreen({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false)
  const [bottleData, setBottleData] = useState(null)

  const dispatch = useDispatch()
  const { yieldId } = useSelector(state => state.yieldId)
  const { yieldBottleData, yieldBottleSummary, loading, error } = useSelector(state => state.yieldBottleData)

  useEffect(() => {
    dispatch(getYieldBottleData(yieldId))
  }, [dispatch])

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
      <Button title="Regresar" onPress={() => navigation.navigate('Yield Reports')}/>
    </Screen>
  )

  return (
    <Screen style={styles.container}>
      <View style={{ marginBottom: 20 }} >
        <Text style={[styles.headerText, { fontSize: 28 }]}>Detalle de Botellas</Text>
        <Text style={[styles.subHeaderText, { fontSize: 18, fontWeight: "700", color: colors.primary }]}>{`Diferencia Total ML: ${yieldBottleSummary.totalDeltaMl}`}</Text>
        <Text style={[styles.subHeaderText, { fontSize: 18, fontWeight: "700", color: colors.primary }]}>{`Diferencia Total Tragos: ${yieldBottleSummary.totalDeltaDrinks}`}</Text>
        <ListItemSeparator style={{ marginTop: 20 }} />
      </View>
      <View>
        <ListItemDataHeader titleLeft="Folio" titleRight="Estado"/>
        <ListItemSeparator style={{ marginTop: 10 }}/>
        <FlatList
          data={yieldBottleData}
          ItemSeparatorComponent={ListItemSeparator}
          keyExtractor={(bottle) => bottle.folio.toString()}
          renderItem={({item}) => (
            <ListItemData
              title={item.folio.substring(0, 13)}
              dataLabel={false}
              dataValue={titleCase.titleCase(item.state)}
              onPress={() => {
                setBottleData(() => filterBottleData(yieldBottleData, item.folio))
                setModalVisible(true)
              }} 
            />
          )}
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
          <View style={{ width: "100%" }} >
            <View style={{ paddingTop: 40}}>
              <Text style={styles.headerText}> {bottleData ? bottleData.folio.substring(0, 13) : null}</Text>
              <ListItemSeparator />
            </View>

            <View>
              <ListItemData
                title="Estado de Botella:"
                dataLabel={false}
                dataValue={bottleData ? bottleData.state : null} 
              />
              <ListItemSeparator />
              <ListItemData
                title="Volumen Actual:"
                dataLabel={false}
                dataValue={bottleData ? `${bottleData.actualVolume} ml` : null} 
              />
              <ListItemSeparator />
              <ListItemData
                title="Volumen Anterior:"
                dataLabel={false}
                dataValue={bottleData ? `${bottleData.pastVolume} ml` : null} 
              />
              <ListItemSeparator />
              <ListItemData
                title="Diferencia en Mililitros:"
                dataLabel={false}
                dataValue={bottleData ? bottleData.deltaMl : null} 
              />
              <ListItemSeparator />
              <ListItemData
                title="Diferencia en Tragos"
                dataLabel={false}
                dataValue={bottleData ? bottleData.deltaDrinks : null} 
              />
              <ListItemSeparator />
              
            </View>
          </View>

          <View style={{width: '100%', marginBottom: 10 }}>
            <Button title="Volver" disabled={false} onPress={() => setModalVisible(!modalVisible)}/>  
          </View>

        </View>
      </Modal> 
    </Screen>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 6,
    justifyContent: 'flex-start'
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
  headerText: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    marginLeft: 20,
  },
  subHeaderText: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginLeft: 20,
    fontSize: 15,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
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