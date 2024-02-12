import { useState } from "react";
import AuthenticationLayout from "../layouts/Authentication/";
import { useFormik } from "formik";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const formik = useFormik({
    initialValues: { email: "", password: "", "repeat password": "" },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      "repeat password": yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "passwords must match"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(() =>
          signInWithEmailAndPassword(auth, values.email, values.password).then(
            () => {
              toast({
                status: "success",
                duration: 3000,
                title: "Register",
                description: "Congrats! you successfully registered",
                isClosable: true,
                position: "top",
              });
              navigate("/");
              setLoading(false);
            }
          )
        )
        .catch((err) => console.log(err));
    },
  });
  let inputs = Object.keys(formik.initialValues);
  return (
    <>
      {loading && <Spinner position={"absolute"} top="100px" left="50%" />}
      <AuthenticationLayout type={"Register"} inputs={inputs} formik={formik} />
    </>
  );
}

export default Register;
