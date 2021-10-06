import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, FlatList, View, Image } from 'react-native'

import Screen from "../components/Screen";
import ListItem from '../components/lists/ListItem'
import ListItemSeparator from '../components/lists/ListItemSeparator'
import Button from '../components/Button'
import Text from '../components/Text'

import colors from '../config/colors';
import cache from '../utility/cache'
import { listQuickCounts, listTotalCounts } from '../store/actions/countActions';

import { useDispatch, useSelector } from 'react-redux'

const CountListScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  
  const quickCountsData = useSelector(state => state.quickCounts)
  const { quickCounts, error: errorQuickCounts } = quickCountsData

  const totalCountsData = useSelector(state => state.totalCounts)
  const { totalCounts, error: errorTotalCounts } = totalCountsData
  
  const countTypeData = useSelector(state => state.countType)
  const { countType } = countTypeData

  useEffect(() => {
    (async function requestCounts() {
      const storageAreaId = await cache.get('Almacen')
      if (countType === 'DIARIA') {
        dispatch(listQuickCounts(storageAreaId))
      }
      dispatch(listTotalCounts(storageAreaId))
    })()
  }, [dispatch])

  if((countType === 'DIARIA' && errorQuickCounts) || (countType === 'TOTAL' && errorTotalCounts)) return (
    <Screen style={styles.containerError}>
      <View style={{padding: 40}}>
        <Image style={styles.icon} source={require("../../assets/alert-outline.png")} />
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
              console.log("Count pressed!")
              navigation.navigate('Inventory Actions', {
                screen: 'Acciones',
                storageAreaId: item.id
              })
            }} 
          />
        )}
      />

      {(countType === 'DIARIA') ? <Button title="Nueva Inspeccion Rapida" disabled={true} onPress={() => console.log("Nueva inspecion rapida!")}/> : null}
      {(countType === 'TOTAL') ? <Button title="Nueva Inspeccion Total" disabled={true} onPress={() => console.log("Nueva inspecion total!")}/> : null}

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
})
