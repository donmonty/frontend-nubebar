import React from "react";
import { Formik } from "formik";

import FormField from './FormField';
import { useBottleId, useBottleWeight } from './BottleContext';

function BottleForm({ initialValues, onSubmit, children }) {

  const hasBottleId = useBottleId()
  const hasBottleWeight = useBottleWeight()

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default BottleForm;