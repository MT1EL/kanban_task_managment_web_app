import * as yup from "yup";
export const profileValidationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

export const passwordValidationSchema = yup.object({
  password: yup.string().required(),
});

export const resetPasswordValidationSchema = yup.object({
  "Current password": yup.string().required(),
  "New password": yup.string().required(),
  "Confirm password": yup
    .string()
    .required()
    .oneOf([yup.ref("New password")], "passwords must match"),
});
