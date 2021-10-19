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

import { useDispatch, useSelector } from 'react-redux'
import { getYieldSalesData } from '../../store/actions/yieldActions'

function filterSalesData(salesData, id) {
  return salesData.filter(item => item.id === id)[0]
}


export default function YieldSalesDataScreen({ navigation, route }) {

  const [salesItemData, setSalesItemData] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const dispatch = useDispatch()
  const { yieldSalesData, ingredient, loading, error } = useSelector(state => state.yieldSalesData)
  const { yieldId } = useSelector(state => state.yieldId)

  useEffect(() => {
    dispatch(getYieldSalesData(yieldId))
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
        <Text style={[styles.headerText, { fontSize: 28 }]}>Detalle de Venta</Text>
        <Text style={[styles.subHeaderText, { fontSize: 18, fontWeight: "700", color: colors.primary }]}>{ingredient}</Text>
        <ListItemSeparator style={{ marginTop: 20 }} />
      </View>
      <View>
        <ListItemDataHeader titleLeft="Producto" titleRight="Cantidad"/>
        <ListItemSeparator style={{ marginTop: 10 }}/>
        <FlatList
          data={yieldSalesData}
          ItemSeparatorComponent={ListItemSeparator}
          keyExtractor={(report) => report.id.toString()}
          renderItem={({item}) => (
            <ListItemData
              title={titleCase.titleCase(item.recipeName)}
              dataLabel={false}
              dataValue={item.quantity}
              onPress={() => {
                setSalesItemData(() => filterSalesData(yieldSalesData, item.id))
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
              <Text style={styles.headerText}> {salesItemData ? titleCase.titleCase(salesItemData.recipeName) : null}</Text>
              <ListItemSeparator />
            </View>

            <View>
              <ListItemData
                title="Código de venta:"
                dataLabel={false}
                dataValue={salesItemData ? salesItemData.posCode : null} 
              />
              <ListItemSeparator />
              <ListItemData
                title="Fecha:"
                dataLabel={false}
                dataValue={salesItemData ? salesItemData.date : null} 
              />
              <ListItemSeparator />
              <ListItemData
                title="Caja:"
                dataLabel={false}
                dataValue={salesItemData ? salesItemData.register : null} 
              />
              <ListItemSeparator />
              <ListItemData
                title="Cantidad:"
                dataLabel={false}
                dataValue={salesItemData ? salesItemData.quantity : null} 
              />
              <ListItemSeparator />
              <ListItemData
                title="Importe:"
                dataLabel={false}
                dataValue={salesItemData ? `$${salesItemData.amount}` : null} 
              />
              <ListItemSeparator />
              <ListItemData
                title="Volumen de Receta:"
                dataLabel={false}
                dataValue={salesItemData ? `${salesItemData.recipeVolume} ml` : null} 
              />
              <ListItemSeparator />
              <ListItemData
                title="Volumen Facturado:"
                dataLabel={false}
                dataValue={salesItemData ? `${salesItemData.salesVolume} ml` : null} 
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