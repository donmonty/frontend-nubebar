import React, { useState } from "react";
import { StyleSheet  } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";

import { setBarcode } from '../store/actions/bottleActions'
import { useDispatch } from 'react-redux'


const validationSchema = Yup.object().shape({
  barcode: Yup.string().required().matches(/\d{8}(\d{5})?/, "Debe ser un codigo valido"),
});

export default function ManualBarcodeScreen({ navigation }) {

  const [barcodeFailed, setBarcodeFailed] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = ({ barcode }) => {
    dispatch(setBarcode(barcode))
    setBarcodeFailed(false)
    navigation.navigate('Bottle Details')
    //navigation.navigate('Bottle Details', { barcode: barcode })
  }

  return (
    <Screen
      style={styles.container}
    >
      <Form
        initialValues={{ barcode: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Formato de codigo no valido."
          visible={barcodeFailed}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="bottle-wine"
          keyboardType="number-pad"
          name="barcode"
          placeholder="Ingresa el codigo de barras"
          
        />
        <SubmitButton title="Registrar codigo" />
      </Form>
    </Screen>
  )
  
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})