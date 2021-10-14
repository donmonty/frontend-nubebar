import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import Screen from "../components/Screen"
import ListItem from '../components/lists/ListItem'
import ListItemSeparator from '../components/lists/ListItemSeparator'
import Text from '../components/Text'
import Button from '../components/Button'
import colors from '../config/colors'
import { listBottlesPending, listBottlesDone } from '../store/actions/countActions'

import { useDispatch, useSelector } from 'react-redux'


export default function CountBottlesList({ navigation, route }) {

  const dispatch = useDispatch()

  const productId = route.params.productId
  const productName = route.params.productName

  const countIdData = useSelector(state => state.countId)
  const { countId } = countIdData

  const pendingBottlesListData = useSelector(state => state.pendingBottlesList)
  const { pendingBottlesList, loading: loadingPending, error: errorPending } = pendingBottlesListData

  const doneBottlesListData = useSelector(state => state.doneBottlesList)
  const { doneBottlesList, loading: loadingDone, error: errorDone } = doneBottlesListData

  const countSummaryTypeData = useSelector(state => state.countSummaryType)
  const { countSummaryType } = countSummaryTypeData

  useEffect(() => {
    if (countSummaryType === 'PENDING') {
      dispatch(listBottlesPending(countId, productId))
    } else {
      dispatch(listBottlesDone(countId, productId))
    }
  }, [dispatch])

  if (loadingPending || loadingDone) return (
    <Screen style={styles.container}>
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <MaterialCommunityIcons color={colors.primary} name="timer-sand" size={70} />
        <Text style={styles.alertText}>Cargando...</Text>
      </View>
    </Screen>
  )

  if (errorPending || errorDone) return (
    <Screen style={styles.container}>
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <MaterialIcons color={colors.red} name="error" size={70} />
        <Text style={styles.alertText}>Hubo un error. Intenta de nuevo.</Text>
      </View>
      <Button title="Regresar" onPress={() => navigation.navigate('Count Summary Details')}/>
    </Screen>
  )

  return (
    <Screen>
      <Text style={styles.headerText}>{productName}</Text>
      <FlatList 
        data={(countSummaryType === 'PENDING') ? pendingBottlesList : doneBottlesList}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(bottle) => bottle.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.folio || item.sat_hash}
            onPress={() => navigation.navigate('Count History', { bottleId: item.sat_hash })}
          />
        )}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 6,
  },
  alertText: {
    alignSelf: 'center',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24,
  },
  headerText: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginLeft: 20,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 24,
    color: colors.primary
  }
})