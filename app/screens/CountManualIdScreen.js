import React, { useState } from "react";
import { StyleSheet  } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage
} from "../components/forms"

const validationSchema = Yup.object().shape({
  folio: Yup.string().required().max(12)
})

export default function CountManualIdScreen({ navigation }) {

  const [folioFailed, setFolioFailed] = useState(false)

  const handleSubmit = ({ folio }) => {
    setFolioFailed(false)
    navigation.navigate('Count Bottle Details', { qrCode: folio })
  }

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ folio: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="bottle-wine"
          keyboardType="email-address"
          name="folio"
          placeholder="Ingresa el folio de la botella" 
        />
        <ErrorMessage
          error="El folio no puede tener mas de 12 caracteres."
          visible={folioFailed}
        />
        <SubmitButton title="Continuar" />
      </Form>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})