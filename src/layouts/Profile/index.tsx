import {
  Button,
  Divider,
  Flex,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AuthError,
  EmailAuthProvider,
  User,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import ProfileHeader from "../../components/Header/ProfileHeader";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/Modals/DeleteModal";
import { useFormik } from "formik";
import * as yup from "yup";
function index({ user }: { user: User }) {
  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: yup.object({ password: yup.string().required() }),
    onSubmit: (values) => {
      console.log(values);
      const credential = EmailAuthProvider.credential(
        user.email as string,
        values.password
      );
      reauthenticateWithCredential(user, credential)
        .then((user) =>
          user.user.delete().then(() => {
            toast({
              status: "success",
              title: "Account Deleted",
              description: "Your account has been deleted successfully",
            });
          })
        )
        .catch((error: AuthError) => console.log(error));
    },
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
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
    <Flex flexDir={"column"} maxW="700px" w="100%" gap="2rem">
      <Flex
        p="1.5rem"
        flexDir={"column"}
        gap="1rem"
        border="1px solid rgba(130, 143, 163, 0.25)"
        borderRadius={"10px"}
      >
        <ProfileHeader user={user} />
        <Flex flexDir="column" gap="1rem">
          <Input placeholder="Name" />
          <Input placeholder="Email" />
          <Input placeholder="Password" />
        </Flex>
        <Flex gap="1rem">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
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
        />
        <Button variant="destructive" size="sm" onClick={onOpen}>
          Delete Account
        </Button>
      </Flex>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onDeleteClick={formik.handleSubmit}
        title={"Delete Account"}
      />
    </Flex>
  );
}

export default index;
