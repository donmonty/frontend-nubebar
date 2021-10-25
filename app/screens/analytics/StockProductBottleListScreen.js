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

import { useDispatch, useSelector } from 'react-redux'
import { getStockProductBottleList } from '../../store/actions/stockActions'

export default function StockProductBottleListScreen({ navigation, route }) {

  const dispatch = useDispatch()
  const { productId, locationId, product } = route.params
  const { 
    stockProductBottleListData,  
    loading, 
    error
  } = useSelector(state => state.stockProductBottleList)
  
  useEffect(() => {
    dispatch(getStockProductBottleList(productId, locationId))
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
        <Text style={styles.headerText}>{titleCase.titleCase(product)}</Text>
        <Text style={styles.subHeaderText}>Lista de botellas</Text>
        <ListItemSeparator style={{ marginTop: 20 }} />
        
      </View>

      <View>
        <ListItemDataHeader titleLeft="Folio" titleRight="Contenido" />
        <ListItemSeparator style={{ marginTop: 10 }} />
        <FlatList
          data={stockProductBottleListData}
          ItemSeparatorComponent={ListItemSeparator}
          keyExtractor={(product) => product.folio.toString()}
          renderItem={({item}) => (
            <ListItemData
              title={item.folio.substring(0, 13)}
              subTitle={`${item.currentWeight} gr`}
              dataLabel={false}
              dataValue={`${item.content} ml`}
              onPress={() => {}}
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