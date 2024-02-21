import React from "react";

export const handleNewSubtask = (formik: any) => {
  const formik_values_keys = Object.keys(formik.values);
  if (formik_values_keys.length > 0) {
    const newInitialValueName = `subtask${
      Object.keys(formik.values).length - 1
    }`;
    formik.setFieldValue(
      newInitialValueName,
      formik.values[newInitialValueName]
        ? formik.values[newInitialValueName]
        : ""
    );
  }
};

export const handleDeleteSubtask = (key: string, formik: any) => {
  const newValues = { ...formik.values };
  delete newValues[key];
  formik.setValues(newValues);
};
