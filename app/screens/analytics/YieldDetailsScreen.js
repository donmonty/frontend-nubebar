import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"

import Screen from "../../components/Screen"
import ListItemSeparator from '../../components/lists/ListItemSeparator'
import Button from '../../components/Button'
import Text from '../../components/Text'
import ListItemData from '../../components/lists/ListItemData'

import colors from '../../config/colors'
import titleCase from '../../utility/titleCase'

import { useDispatch, useSelector } from 'react-redux'

export default function YieldDetailsScreen({ navigation, route }) {

  const dispatch = useDispatch()
  const { yieldData, loading, error } = useSelector(state => state.yieldReport)
  const yieldId = route.params.yieldId

  const yieldDetails = yieldData.filter(item => item.id === yieldId)[0]

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
      <View>
        <View style={{ marginBottom: 20 }} >
          <Text style={styles.headerText}>{titleCase.titleCase(yieldDetails.ingrediente.nombre)}</Text>
        </View>
        <ListItemData
          title="Consumo Facturado"
          dataLabel={false}
          dataValue={`${yieldDetails.consumo_ventas} ml`} 
        />
        <ListItemSeparator />
        <ListItemData
          title="Consumo Real"
          dataLabel={false}
          dataValue={`${yieldDetails.consumo_real} ml`} 
        />
        <ListItemSeparator />
        <ListItemData
          title="Diferencia"
          dataLabel={false}
          dataValue={`${yieldDetails.merma} ml`} 
        />
        <ListItemSeparator />
        <ListItemData
          title="Porcentaje"
          dataLabel={true}
          dataValue={`${yieldDetails.porcentaje} %`} 
        />
      </View>
      <Button title="Ver Detalle de Venta" onPress={console.log("Pressed")} /> 
    </Screen>
  )
}

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
  headerText: {
    alignSelf: 'flex-start',
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    marginLeft: 20,
  },
  subHeaderText: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginLeft: 20,
    fontSize: 15,
  }
  
})