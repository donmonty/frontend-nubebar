import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title }) {
  const { handleSubmit, errors } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} disabled={errors ? true : false} />;
}

export default SubmitButton;