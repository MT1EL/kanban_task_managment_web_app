import {
  Button,
  Divider,
  Flex,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { User, getAuth } from "firebase/auth";
import ProfileHeader from "../../components/Header/ProfileHeader";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/Modals/DeleteModal";
import { FormikProps, useFormik } from "formik";
import ProfileImageModal from "../../components/Modals/ProfileImageModal";
import {
  deleteUserOnSubmit,
  updateUserOnSubmit,
} from "../../formik/onSubmit/profile";
import {
  passwordValidationSchema,
  profileValidationSchema,
} from "../../formik/validationSchemas/Profile";
function index({ user }: { user: User }) {
  const UserFormik = useFormik({
    initialValues: { name: user.displayName, email: user.email },
    validationSchema: profileValidationSchema,
    onSubmit: (values) => {
      updateUserOnSubmit(values as any, toast);
    },
  });
  interface FormValues {
    password: string;
  }
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: { password: "" },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => deleteUserOnSubmit(values, toast, onClose, formik),
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isImageModalOpen,
    onClose: onImageModalClose,
    onOpen: onImageModaOpen,
  } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();
  const handleSignOut = () => {
    getAuth().signOut(),
      toast({
        duration: 3000,
        variant: "info",
        title: "Sign out",
        description: "you have signed out from your account.",
        isClosable: true,
        position: "top",
      }),
      navigate("/login");
  };
  return (
    <Flex flexDir={"column"} maxW="700px" w="100%" gap="2rem ">
      <Flex
        p="1.5rem"
        flexDir={"column"}
        gap="1rem"
        border="1px solid rgba(130, 143, 163, 0.25)"
        borderRadius={"10px"}
      >
        <ProfileHeader user={user} onImageModaOpen={onImageModaOpen} />
        <Flex flexDir="column" gap="1rem">
          {Object.keys(UserFormik.values).map((key) => (
            <Input
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              key={key}
              name={key}
              onChange={UserFormik.handleChange}
              value={
                UserFormik.values[
                  key as keyof typeof UserFormik.values
                ] as string
              }
              disabled={key === "email"}
            />
          ))}
          <Input placeholder="Password" />
        </Flex>
        <Flex gap="1rem">
          <Button variant="secondary" onClick={() => UserFormik.resetForm()}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => UserFormik.handleSubmit()}>
            Save
          </Button>
        </Flex>
      </Flex>
      <Flex
        p="1.5rem"
        maxW="700px"
        flexDir={"column"}
        gap="1rem"
        border="1px solid rgba(130, 143, 163, 0.25)"
        borderRadius={"10px"}
      >
        <Flex flexDir={"column"}>
          <Text color="red">Danger zone</Text>
          <Text>The actions you take in this section can not be undone.</Text>
        </Flex>
        <Divider />
        <Text>Sign out from account</Text>
        <Button variant="destructive" size="sm" onClick={handleSignOut}>
          Sign out
        </Button>
        <Divider />
        <Text>Permanently delete your account</Text>
        <Input
          placeholder="Enter your password"
          name="password"
          onChange={formik.handleChange}
          type="password"
        />
        {formik.errors.password && (
          <Text color="red" size="xs">
            {formik.errors.password}
          </Text>
        )}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => formik.values.password && onOpen()}
        >
          Delete Account
        </Button>
      </Flex>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onDeleteClick={formik.handleSubmit}
        title={"Delete Account"}
      />
      <ProfileImageModal
        isOpen={isImageModalOpen}
        onClose={onImageModalClose}
      />
    </Flex>
  );
}

export default index;
