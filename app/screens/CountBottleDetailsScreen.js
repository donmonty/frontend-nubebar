import React, { useEffect } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'

import { MaterialIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import Screen from '../components/Screen'
import Button from '../components/Button'
import ListItemSeparator from '../components/lists/ListItemSeparator'
import BottleItem2 from '../components/BottleItem2'
import Text from '../components/Text'
import colors from '../config/colors'

import { useDispatch, useSelector } from 'react-redux'
import { getBottleCountDetails } from '../store/actions/countActions'


export default function CountBottleDetailsScreen({ navigation, route }) {

  const dispatch = useDispatch()

  const bottleData = useSelector(state => state.bottle)
  const { bottle, loading: bottleLoading = true, error: bottleError } = bottleData

  const qrCode = route.params.qrCode
  const countId = route.params.countId

  useEffect(() => {
    dispatch(getBottleCountDetails(countId, qrCode))
  }, [dispatch])

  if (bottleLoading) return (
    <Screen style={styles.container}>
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <MaterialCommunityIcons color={colors.primary} name="timer-sand" size={70} />
        <Text style={styles.alertText}>Cargando...</Text>
      </View>
    </Screen>
  )

  if (bottleError) return (
    <Screen style={styles.container}>
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <MaterialIcons color={colors.red} name="error" size={70} />
        <Text style={styles.alertText}>{bottleError}</Text>
      </View>
      <Button title="Regresar" onPress={() => navigation.navigate('Count Summary')}/>
    </Screen>
  )

  return(
    <Screen style={styles.container}>
      <FlatList
        data={[bottle]}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(botella) => botella.id.toString()}
        renderItem={({ item }) => (
          <BottleItem2
            name={item.nombre_marca}
            capacity={item.capacidad}
            id={item.folio || item.sat_hash}
          />
        )}
      />
      <Button title="Pesar Botella" onPress={() => console.log("Navigate to Weight Bottle Screen")} />
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
    alignSelf: "center",
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24
  }
})
