import React, { useEffect } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"

import Screen from "../../components/Screen"
import ListItemSeparator from '../../components/lists/ListItemSeparator'
import Button from '../../components/Button'
import Text from '../../components/Text'
import ListItemData from '../../components/lists/ListItemData'
import ListItemDataHeader from '../../components/lists/ListItemDataHeader'

import colors from '../../config/colors'
import titleCase from '../../utility/titleCase'

import { getYieldReport, setYieldId } from '../../store/actions/yieldActions'
import { useDispatch, useSelector } from 'react-redux'


export default function YieldReportDetailsScreen({ navigation }) {
  
  const dispatch = useDispatch()
  const { reportData, yieldData, loading, error } = useSelector(state => state.yieldReport)
  const { yieldReportId } = useSelector(state => state.yieldReportId)

  useEffect(() => {
    dispatch(getYieldReport(yieldReportId))
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
      <View style={{ marginBottom: 20 }} >
        <Text style={styles.headerText}>Rendimientos</Text>
        <Text style={styles.subHeaderText}>{`Fecha Inicial: ${reportData.startDate}`}</Text>
        <Text style={styles.subHeaderText}>{`Fecha Final: ${reportData.finishDate}`}</Text>
        <ListItemSeparator style={{ marginTop: 20 }} />
        
      </View>

      <View>
        <ListItemDataHeader titleLeft="Producto" titleRight="Diferencia" />
        <ListItemSeparator style={{ marginTop: 10 }} />
        <FlatList
          data={yieldData}
          ItemSeparatorComponent={ListItemSeparator}
          keyExtractor={(report) => report.id.toString()}
          renderItem={({item}) => (
            <ListItemData
              title={titleCase.titleCase(item.ingrediente.nombre)}
              dataLabel={true}
              dataValue={`${item.porcentaje} %`}
              onPress={() => {
                dispatch(setYieldId(item.id))
                navigation.navigate('Yield Details')
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
