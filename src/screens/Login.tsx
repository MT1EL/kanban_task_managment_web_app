import { useFormik } from "formik";
import AuthenticationLayout from "../layouts/Authentication/";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Spinner, useToast } from "@chakra-ui/react";
import * as yup from "yup";
function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setLoading(false);
          toast({
            status: "success",
            isClosable: true,
            title: "Log in",
            description: "Congrats! you succesfully loged in.",
            position: "top",
          });
          navigate("/");
        })
        .catch((err) => {
          formik.setErrors({ password: "Invalid email or password" });
          setLoading(false);
        });
    },
  });
  let inputs = Object.keys(formik.initialValues);
  return (
    <>
      {loading && <Spinner position={"absolute"} top="100px" left="50%" />}
      <AuthenticationLayout type={"Log in"} inputs={inputs} formik={formik} />
    </>
  );
}

export default Login;
