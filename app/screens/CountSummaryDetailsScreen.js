import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, View, SectionList } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import Screen from "../components/Screen"
import ListItem from '../components/lists/ListItem'
import ListItemSeparator from '../components/lists/ListItemSeparator'
import Text from '../components/Text'
import Button from '../components/Button'
import colors from '../config/colors'

import { getCountPendingSummary, getCountDoneSummary } from '../store/actions/countActions'
import { useDispatch, useSelector } from 'react-redux'


const CountPendingSummaryScreen = ({ navigation, route }) => {

  const dispatch = useDispatch()

  const countIdData = useSelector(state => state.countId)
  const { countId } = countIdData
  
  const countSummaryTypeData = useSelector(state => state.countSummaryType)
  const { countSummaryType } = countSummaryTypeData

  const countPendingSummaryData = useSelector(state => state.countPendingSummary)
  const { countPendingSummary, loading: loadingPending, error: errorPending } = countPendingSummaryData

  const countDoneSummaryData = useSelector(state => state.countDoneSummary)
  const { countDoneSummary, loading: loadingDone, error: errorDone } = countDoneSummaryData

  useEffect(() => {
    if (countSummaryType === 'PENDING') {
      dispatch(getCountPendingSummary(countId))
    } else {
      dispatch(getCountDoneSummary(countId))
    }
  }, [dispatch])

  const handleOnPress = (productId, productName) => {
    navigation.navigate('Count List Bottles', { productId: productId, productName: productName })
  }

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
      <Button title="Regresar" onPress={() => navigation.navigate('Count List')}/>
    </Screen>
  )

  return (
    <Screen style={styles.container}>
      <SectionList
        sections={(countSummaryType === 'PENDING' ? countPendingSummary : countDoneSummary)}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <ListItem title={`${item.ingrediente}  (${item.cantidad})`} onPress={() => handleOnPress(item.ingrediente_id, item.ingrediente)} />}
        renderSectionHeader={({ section: { categoria } }) => (
          <Text style={styles.headerText}>{categoria}</Text>
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />


    </Screen>
  )
}

export default CountPendingSummaryScreen

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
