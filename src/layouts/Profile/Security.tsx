import { Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";

import { updatePassowrdOnSubmit } from "../../formik/onSubmit/profile";
import { resetPasswordValidationSchema } from "../../formik/validationSchemas/Profile";
import { resetPasswordInitialValues } from "../../formik/initialValues/profile";
function Security() {
  const toast = useToast();
  const formik = useFormik({
    initialValues: resetPasswordInitialValues,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values): void => updatePassowrdOnSubmit(values, toast, formik),
  });

  return (
    <Flex
      flexDir={"column"}
      w="500px"
      gap="1rem"
      border="1px solid rgba(130, 143, 163, 0.25)"
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
      <Button onClick={() => formik.handleSubmit()}>Reset Password</Button>
    </Flex>
  );
}

export default Security;
