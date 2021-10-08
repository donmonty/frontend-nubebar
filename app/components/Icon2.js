import React from "react"
import { View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import colors from '../config/colors'

function Icon2({
  name,
  size = 40,
  backgroundColor = colors.gray['600'],
  iconColor = colors.white,
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialIcons name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}


export default Icon2