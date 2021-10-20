import React, { useEffect } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"

import Screen from "../../components/Screen";
import ListItemDataHeader from '../../components/lists/ListItemDataHeader'
import ListItemData from '../../components/lists/ListItemData'
import ListItemSeparator from '../../components/lists/ListItemSeparator'
import Button from '../../components/Button'
import Text from '../../components/Text'

import colors from '../../config/colors'
import titleCase from '../../utility/titleCase'

import { getStockProductList } from '../../store/actions/stockActions'
import { useDispatch, useSelector } from 'react-redux'


export default function StockProductListScreen({ navigation }) {

  const dispatch = useDispatch()
  const { stockProductListData, stockProductListSummary, loading, error } = useSelector(state => state.stockProductList)
  const { locationId } = useSelector(state => state.locationId)

  useEffect(() => {
    dispatch(getStockProductList(locationId))
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
      <Button title="Regresar" onPress={() => navigation.navigate('Inventory Actions', { screen: 'Reportes'})}/>
    </Screen>
  )

  return (
    <Screen style={styles.container}>
      <View style={{ marginBottom: 20 }} >
        <Text style={styles.headerText}>Stock por Producto</Text>
        <Text style={styles.subHeaderText}>{`Fecha: ${stockProductListSummary.date}`}</Text>
        <ListItemSeparator style={{ marginTop: 20 }} />
        
      </View>

      <View>
        <ListItemDataHeader titleLeft="Producto" titleRight="Cantidad" />
        <ListItemSeparator style={{ marginTop: 10 }} />
        <FlatList
          data={stockProductListData}
          ItemSeparatorComponent={ListItemSeparator}
          keyExtractor={(product) => product.id.toString()}
          renderItem={({item}) => (
            <ListItemData
              title={titleCase.titleCase(item.product)}
              subTitle={item.category}
              dataLabel={false}
              dataValue={item.quantity}
              onPress={() => {
                navigation.navigate('Stock Product Bottle List', { productId: item.id, locationId: locationId })
              }} 
            />
          )}
        />
      </View>
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