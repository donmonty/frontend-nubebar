import React from 'react'
import { StyleSheet } from 'react-native'
import Screen from "../../components/Screen"
import ListItem from '../../components/lists/ListItem';
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

    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 6,
  },
})