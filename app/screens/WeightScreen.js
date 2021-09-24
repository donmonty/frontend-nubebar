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
import { getBottleWeight } from '../store/actions/bottleActions'

const validationSchema = Yup.object().shape({
  weight: Yup.number().required().positive().integer().label("Bottle Weight"),
});

export default function WeightScreen() {

  const [weightFailed, setWeightFailed] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = ({ weight }) => {
    dispatch(getBottleWeight(weight))
  }

  return (
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
        placeholder="Bottle Weight"
        
      />
    </Form>
  )

  
}