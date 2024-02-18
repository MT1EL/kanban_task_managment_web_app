import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  UserCredential,
  AuthError,
  User,
  EmailAuthProvider,
} from "firebase/auth";
import { Box, Button, Flex, Input, useToast, Text } from "@chakra-ui/react";
import { useFormik } from "formik";

import * as yup from "yup";
function Security({ user }: { user: User }) {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      "Current password": "",
      "New password": "",
      "Confirm password": "",
    },
    validationSchema: yup.object({
      "Current password": yup.string().required(),
      "New password": yup.string().required(),
      "Confirm password": yup
        .string()
        .required()
        .oneOf([yup.ref("New password")], "passwords must match"),
    }),
    onSubmit: (values) => {
      const credential = EmailAuthProvider.credential(
        user.email as string,
        values["Current password"]
      );
      reauthenticateWithCredential(user, credential)
        .then(() =>
          updatePassword(user, values["New password"]).then(() => {
            toast({
              status: "success",
              title: "Password changed Succesfully",
            });
            formik.resetForm();
          })
        )
        .catch(
          (error: AuthError) => (
            console.log(error),
            formik.setFieldError("Current password", error.message)
          )
        );
    },
  });

  return (
    <Flex
      flexDir={"column"}
      w="500px"
      gap="1rem"
      border="1px solid"
      borderColor={"medium_Grey"}
      p="1.5rem"
      borderRadius={"10px"}
    >
      {Object.keys(formik.initialValues).map((key) => (
        <Box key={key}>
          <Input
            {...formik.getFieldProps(key)}
            placeholder={key}
            type="password"
          />
        </Box>
      ))}
      <Button onClick={formik.handleSubmit}>Reset Password</Button>
    </Flex>
  );
}

export default Security;
