import React from 'react'
import { StyleSheet } from 'react-native'
import Screen from "../components/Screen"
import ListItem from '../components/lists/ListItem';
import Icon from '../components/Icon'
import colors from '../config/colors'

import { useDispatch } from 'react-redux'
import { setCountType } from '../store/actions/countActions'


function CountActions({ navigation }) {

  const dispatch = useDispatch()

  return(
    <Screen style={styles.container}>

      <ListItem
        type = 'button-list'
        title="Inspecciones Rápidas"
        subTitle="Inspecciones rápidas contra ventas"
        onPress={() => {
          dispatch(setCountType('DIARIA'))
          navigation.navigate('Counts', {
            screen: 'Count List'
          })
        }}
        IconComponent={
          <Icon
            name="lightning-bolt"
            iconColor={colors.white}
            backgroundColor={colors.primary}
          />
        }
      />

      <ListItem
        type = 'button-list'
        title="Inspecciones Totales"
        subTitle="Inspecciones totales del inventario"
        onPress={() => {
          dispatch(setCountType('TOTAL'))
          navigation.navigate('Counts', {
            screen: 'Count List'
          })
        }}
        IconComponent={
          <Icon
            name="all-inclusive"
            iconColor={colors.white}
            backgroundColor={colors.primary}
          />
        }
      />

    </Screen>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 6,
  },
});

export default CountActions;