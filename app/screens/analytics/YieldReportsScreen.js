import React, { useEffect } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"

import Screen from "../../components/Screen";
import ListItem from '../../components/lists/ListItem'
import ListItemSeparator from '../../components/lists/ListItemSeparator'
import Button from '../../components/Button'
import Text from '../../components/Text'

import colors from '../../config/colors'
import cache from '../../utility/cache'

import { getYieldReports, setYieldReportId } from '../../store/actions/yieldActions'

import { useDispatch, useSelector } from 'react-redux'

const YieldReportsScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const { yieldReports, loading, error } = useSelector(state => state.yieldReports)

  useEffect(() => {
    (async function getYieldReportsData() {
      const storageAreaId = await cache.get('Almacen')
      dispatch(getYieldReports(storageAreaId))
    })()
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
      <Button title="Regresar" onPress={() => navigation.navigate('Yield Reports')}/>
    </Screen>
  )

  return (
    <Screen style={styles.container}>
      <FlatList
        data={yieldReports}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={(report) => report.id.toString()}
        renderItem={({item}) => (
          <ListItem
            title={item.fecha_registro}
            onPress={() => {
              dispatch(setYieldReportId(item.id))
              navigation.navigate('Yield Report Summary')
            }} 
          />
        )}
      />
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
  
})

export default YieldReportsScreen