import { Dispatch } from "react";

export const useColumnAdd = (formik: any, setIsDisabled: Dispatch<boolean>) => {
  const formik_values_keys = Object.keys(formik.values);
  if (formik_values_keys.length === 5) {
    setIsDisabled(true);
  }
  if (formik_values_keys.length > 0 && formik_values_keys.length < 6) {
    const newInitialValueName = `col${Object.keys(formik.values).length - 1}`;
    formik.setFieldValue(
      newInitialValueName,
      formik.values[newInitialValueName]
        ? formik.values[newInitialValueName]
        : ""
    );
  }
};
