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

import { listBottleCounts } from '../store/actions/countActions'
import { useDispatch, useSelector } from 'react-redux'


export default function CountBottleCountsScreen({ navigation, route }) {

  const dispatch = useDispatch()
  const sat_hash = route.params.bottleId
  const { bottle, bottleCounts, loading, error } = useSelector(state => state.bottleCounts)

  useEffect(() => {
    dispatch(listBottleCounts(sat_hash))
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
      <Button title="Regresar" onPress={() => navigation.navigate('Count List Bottles')}/>
    </Screen>
  )

  return (
    
    <Screen style={styles.container}>
      <View style={{ flex: 1}}>
        <View style={styles.detailsContainer}>
          <Text style={styles.subTitle} numberOfLines={2}>
            Producto
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {bottle.ingrediente}
          </Text>
          <ListItemSeparator/>
        </View> 

        <View style={styles.detailsContainer}>
          <Text style={styles.subTitle} numberOfLines={2}>
            Fecha de alta
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {bottle.fecha_registro.split('T')[0]}
          </Text>
          <ListItemSeparator/>
        </View> 

        <View style={styles.detailsContainer}>
          <Text style={styles.subTitle} numberOfLines={2}>
            Peso inicial
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {bottle.peso_inicial}
          </Text>
          <ListItemSeparator/>
        </View>
      </View>
      <Text style={styles.headerText}>Inspecciones</Text>
      <FlatList
        data={bottleCounts}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(count) => count.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            type="button-list"
            title={!item.peso_botella ? "Pendiente de pesar" : `${item.peso_botella} gr`}
            subTitle={item.timestamp_inspeccion.split('T')[0]}
          />
        )}
      />

    </Screen>
  )
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
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
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 24,
    color: colors.primary
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  subTitle: {
    color: colors.gray['400'],
    fontSize: 14
  },
  title: {
    fontWeight: "500",
    marginBottom: 8
  },
})