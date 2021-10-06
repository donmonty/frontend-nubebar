import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'

import Screen from "../components/Screen";
import ListItem from '../components/lists/ListItem'
import ListItemSeparator from '../components/lists/ListItemSeparator'
import Button from '../components/Button'

import colors from '../config/colors';
import cache from '../utility/cache'
import { listQuickCounts, listTotalCounts } from '../store/actions/countActions';

import { useDispatch, useSelector } from 'react-redux'

const CountListScreen = ({ navigation, route }) => {

  const dispatch = useDispatch()
  
  const quickCountsData = useSelector(state => state.quickCounts)
  const { quickCounts } = quickCountsData

  const totalCountsData = useSelector(state => state.totalCounts)
  const { totalCounts } = totalCountsData
  
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
              // navigation.navigate('Inventory Actions', {
              //   screen: 'Acciones',
              //   storageAreaId: item.id
              // })
              //cache.store('Almacen', item.id);
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
})
