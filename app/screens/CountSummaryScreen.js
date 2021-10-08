import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import Screen from "../components/Screen"
import ListItemBig from '../components/lists/ListItemBig'
import Button from '../components/Button';
import Icon2 from '../components/Icon2'
import Text from '../components/Text'
import colors from '../config/colors'

import { useDispatch, useSelector } from 'react-redux'
import { getCountSummary } from '../store/actions/countActions'


const CountSummaryScreen = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const countSummaryData = useSelector(state => state.countSummary)
  const { countSummary, loading, error } = countSummaryData

  useEffect(() => {
    dispatch(getCountSummary(route.params.countId))
  }, [dispatch])

  if (loading) return (
    <Screen style={styles.containerError}>
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <MaterialCommunityIcons color={colors.primary} name="timer-sand" size={70} />
        <Text style={styles.alertText}>Cargando...</Text>
      </View>
    </Screen>
  )

  if (error) return (
    <Screen style={styles.containerError}>
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <MaterialIcons color={colors.red} name="error" size={70} />
        <Text style={styles.alertText}>Hubo un error. Intenta de nuevo.</Text>
      </View>
      <Button title="Regresar" onPress={() => navigation.navigate('Count List')}/>
    </Screen>
  )

  return (
    <Screen style={styles.container}>
      <View>
        <ListItemBig
          type = 'button-list'
          title="Contadas"
          subTitle="Botellas contadas"
          bottleQuantity={countSummary.botellas_contadas}
          onPress={() => {
            // navigation.navigate('Counted By Brand', {
            //   countId: route.params.countId,
            // })
          }}
          IconComponent={
            <Icon2
              name="done-all"
              iconColor={colors.white}
              backgroundColor={colors.green}
            />
          }
        />
        
        <ListItemBig
          type = 'button-list'
          title="Pendientes"
          subTitle="Botellas pendientes de contar"
          bottleQuantity={countSummary.botellas_no_contadas}
          onPress={() => {
            //dispatch(setCreateType('usada'))
            // navigation.navigate('Pending By Brand', {
            //   countId: route.params.countId,
            // })
          }}
          IconComponent={
            <Icon2
              name="remove-done"
              iconColor={colors.white}
              backgroundColor={colors.red}
            />
          }
        />
      </View>
      <Button title="Escanear Código QR" diabled={true} onPress={() => navigation.navigate('Count Scanner')}/>
    </Screen>
  )
}

export default CountSummaryScreen

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
