import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";

function ListItem({
  type = 'list',
  titleLeft,
  titleRight,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.gray['100']} onPress={onPress}>
        <View style={type === 'list' ? styles.container : styles.buttonContainer}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View >
            <Text style={styles.title} numberOfLines={2}>
              {titleLeft}
            </Text>
          </View>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              {titleRight}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    marginBottom: 8,
    backgroundColor: colors.purple['100'],
    borderRadius: 10,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 20,
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
    fontWeight: "700",
    fontSize: 14,
    textTransform: 'uppercase',
    color: colors.primary
  }
});

export default ListItem;