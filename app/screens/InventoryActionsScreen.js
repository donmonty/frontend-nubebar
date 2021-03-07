import React from 'react'
import { Text, StyleSheet } from 'react-native';
import Screen from "../components/Screen";
import ListItem from '../components/lists/ListItem';
import Icon from '../components/Icon';
import colors from '../config/colors';
import routes from '../navigation/routes';


function InventoryActionsScreen({ navigation }) {

  return(
    <Screen style={styles.container}>
      
      <ListItem
        type = 'button-list'
        title="Alta de Botella"
        subTitle="Ingresar una botella al almacen"
        onPress={() => {
          navigation.navigate(routes.BARCODE, {
            screen: 'Barcode',
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
    </Screen>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 6,
  },
});

export default InventoryActionsScreen;