import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from './Text';
import ListItemSeparator from './lists/ListItemSeparator';
import colors from '../config/colors';


function BottleItem({
  name,
  barcode,
  capacity
}) {

  return(
    <View style={styles.container}>

      <View style={styles.detailsContainer}>
        <Text style={styles.subTitle}>Producto</Text>
        <Text style={styles.title}>{name}</Text>
      </View>
      <ListItemSeparator/>
      <View style={styles.detailsContainer}>
        <Text style={styles.subTitle}>Codigo de Barras</Text>
        <Text style={styles.title}>{barcode}</Text>
      </View>
      <ListItemSeparator/>
      <View style={styles.detailsContainer}>
        <Text style={styles.subTitle}>Capacidad</Text>
        <Text style={styles.title}>{capacity}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
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
  },
})

export default BottleItem;
