import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";

import { useDispatch } from 'react-redux'
import { setBottleWeight } from '../store/actions/bottleActions'

const validationSchema = Yup.object().shape({
  weight: Yup.number().required().positive().integer().max(5000).label("Bottle Weight"),
});

export default function WeightScreen({ navigation }) {

  const [weightFailed, setWeightFailed] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = ({ weight }) => {
    dispatch(setBottleWeight(weight))
    setWeightFailed(false)
    navigation.navigate('Bottle Details')
  }

  return (
    <Screen
      style={styles.container}
    >
      <Form
        initialValues={{ weight: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Peso no valido."
          visible={weightFailed}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="bottle-wine"
          keyboardType="number-pad"
          name="weight"
          placeholder="Ingresa el peso"
          
        />
        <SubmitButton title="Guardar Peso" />
      </Form>
    </Screen>
  )
  
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})