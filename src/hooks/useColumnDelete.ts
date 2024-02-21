import { Dispatch } from "react";

export const useColumnDelete = (
  key: string,
  setIsDisabled: Dispatch<boolean>,
  formik: any
) => {
  const newValues = { ...formik.values };
  delete newValues[key];
  formik.setValues(newValues);
  const formik_values_keys = Object.keys(formik.values);
  if (formik_values_keys.length <= 6) {
    setIsDisabled(false);
  }
};
