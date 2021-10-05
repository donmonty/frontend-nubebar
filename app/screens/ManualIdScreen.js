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

import { useDispatch } from 'react-redux'
import { setFolio } from '../store/actions/bottleActions'

const validationSchema = Yup.object().shape({
  folio: Yup.string().required().matches(/^(Nn|Ii)-?\d{10}/, "Debe ser un folio valido"),
});

export default function ManualIdScreen({ navigation }) {

  const [folioFailed, setFolioFailed] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = ({ folio }) => {
    dispatch(setFolio(folio))
    setFolioFailed(false)
    navigation.navigate('Bottle Details')
  }

  return (
    <Screen
      style={styles.container}
    >
      <Form
        initialValues={{ folio: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Formato de folio no valido."
          visible={folioFailed}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="bottle-wine"
          keyboardType="email-address"
          name="folio"
          placeholder="Ingresa el folio del marbete de SHCP"
          
        />
        <SubmitButton title="Guardar Folio" />
      </Form>
    </Screen>
  )
  
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})