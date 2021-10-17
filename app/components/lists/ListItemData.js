import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";

function ListItem({
  type = 'list',
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  dataLabel,
  dataValue
}) {

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.gray['100']} onPress={onPress}>
        <View style={type === 'list' ? styles.container : styles.buttonContainer}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
          {dataLabel === true ? 
            <View style={[styles.dataLabel, { backgroundColor: (parseInt(dataValue) < -20) ? colors.red : (parseInt(dataValue) > -20 && parseInt(dataValue) < -10) ? colors.yellow : colors.green }]} >
              <Text style={[styles.title], { color: colors.white }}>{dataValue}</Text>
            </View> :
            <View>
              <Text style={styles.title}>{dataValue}</Text>
            </View>}
          
        </View>
      </TouchableHighlight>
    </Swipeable>
  )
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
    fontSize: 18
  },
  dataLabel: {
    padding: 10,
    borderRadius: 10
  }
});

export default ListItem;