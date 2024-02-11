import {
  Box,
  VStack,
  Flex,
  useColorMode,
  Img,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import ThemeSwitcher from "../ThemeToggle/";
import hideIcon from "../../assets/icon-hide-sidebar.svg";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function DrawerFooter({ closeDrawer }: { closeDrawer: any }) {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const authUser = getAuth();
  const toast = useToast();
  return (
    <VStack w="100%" alignItems={"flex-start"} gap="0.375rem" pr="1.5rem">
      <ThemeSwitcher />
      <Button
        w="calc(100% - 1.5rem)"
        alignSelf={"center"}
        variant={"destructive"}
        size="sm"
        ml="1.5rem"
        onClick={() => (
          authUser.signOut(),
          toast({
            duration: 3000,
            variant: "info",
            title: "Sign out",
            description: "you have signed out from your account.",
            isClosable: true,
            position: "top",
          }),
          navigate("/login")
        )}
      >
        Sign out
      </Button>
      <Flex
        gap="1rem"
        alignItems={"center"}
        cursor={"pointer"}
        py="0.5rem"
        _hover={{
          bg:
            colorMode === "dark"
              ? "very_dark_grey_dark_bg"
              : "light_grey_light_bg",
        }}
        borderRightRadius={"1rem"}
        onClick={closeDrawer}
        px="1.5rem"
        w="100%"
      >
        <Img src={hideIcon} alt="hide sidebar" />
        <Text>Hide Sidebar</Text>
      </Flex>
    </VStack>
  );
}

export default DrawerFooter;
