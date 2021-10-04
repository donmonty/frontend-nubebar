import React from 'react'
import { Text, StyleSheet } from 'react-native';
import Screen from "../components/Screen";
import ListItem from '../components/lists/ListItem';
import Icon from '../components/Icon';
import colors from '../config/colors';

import { useDispatch } from 'react-redux'
import { setCreateType } from '../store/actions/bottleActions'
//import routes from '../navigation/routes';

const dispatch = useDispatch()


function BottleActions({ navigation }) {

  return(
    <Screen style={styles.container}>
      
      <ListItem
        type = 'button-list'
        title="Alta de Botella Nueva"
        subTitle="Ingresar una botella nueva al almacen"
        onPress={() => {
          navigation.navigate('Add Bottle', {
            screen: 'Scan Barcode',
          })
        }}
        IconComponent={
          <Icon
            name="bottle-wine"
            iconColor={colors.white}
            backgroundColor={colors.primary}
          />
        }
      />
      <ListItem
        type = 'button-list'
        title="Traspaso"
        subTitle="Traspasar botella a este almacen"
        IconComponent={
          <Icon
            name="swap-horizontal"
            iconColor={colors.white}
            backgroundColor={colors.primary}
          />
        }
      />
      <ListItem
        type = 'button-list'
        title="Baja de Botella"
        subTitle="Dar de baja una botella"
        IconComponent={
          <Icon
            name="bottle-wine-outline"
            iconColor={colors.white}
            backgroundColor={colors.primary}
          />
        }
      />
      <ListItem
        type = 'button-list'
        title="Alta de Botella Abierta"
        subTitle="Ingresar una botella abierta al almacen"
        onPress={() => {
          dispatch(setCreateType('usada'))
          navigation.navigate('Add Bottle', {
            screen: 'Scan Barcode',
          })
        }}
        IconComponent={
          <Icon
            name="bottle-wine"
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

export default BottleActions;