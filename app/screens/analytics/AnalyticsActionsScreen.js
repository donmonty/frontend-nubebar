import React from 'react'
import { StyleSheet } from 'react-native'
import Screen from "../../components/Screen"
import ListItem from '../../components/lists/ListItem';
import Icon from '../../components/Icon'
import Icon2 from '../../components/Icon2'
import colors from '../../config/colors'


export default function AnalyticsActions({ navigation }) {

  return (
    <Screen style={styles.container} >

      <ListItem
        type = 'button-list'
        title="Rendimientos"
        subTitle="Diferencias entre facturado vs real"
        onPress={() => {
          navigation.navigate('Analytics', {
            screen: 'Yield Reports'
          })
        }}
        IconComponent={
          <Icon2
            name="attach-money"
            iconColor={colors.white}
            backgroundColor={colors.primary}
          />
        }
      />

      <ListItem
        type = 'button-list'
        title="Stock"
        subTitle="Stock por tipo de producto"
        onPress={() => {
          navigation.navigate('Analytics', {
            screen: 'Stock Product List'
          })
        }}
        IconComponent={
          <Icon
            name="package-variant-closed"
            iconColor={colors.white}
            backgroundColor={colors.primary}
          />
        }
      />

    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 6,
  },
})