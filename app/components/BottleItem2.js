import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./Text";
import ListItemSeparator from './lists/ListItemSeparator';
import colors from '../config/colors';

function BottleItem2({
  type = 'list',
  name,
  barcode,
  capacity,
}) {
  return (
        <View style={type === 'list' ? styles.container : styles.buttonContainer}>

          <View style={styles.detailsContainer}>
            <Text style={styles.subTitle} numberOfLines={2}>
              Producto
            </Text>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <ListItemSeparator/>
          </View>          
          
          <View style={styles.detailsContainer}>
            <Text style={styles.subTitle} numberOfLines={2}>
              Codigo de Barras
            </Text>
            <Text style={styles.title} numberOfLines={1}>
              {barcode}
            </Text>
            <ListItemSeparator/>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.subTitle} numberOfLines={2}>
              Capacidad
            </Text>
            <Text style={styles.title} numberOfLines={1}>
              {capacity}
            </Text>
          </View>

        </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    marginBottom: 8,
    backgroundColor: colors.purple['100'],
    borderRadius: 10,
  },
  container: {
    //alignItems: "center",
    flexDirection: "column",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.gray['400'],
    fontSize: 14
  },
  title: {
    fontWeight: "500",
    marginBottom: 8
  },
});

export default BottleItem2;