import {
  VStack,
  Flex,
  useColorMode,
  Img,
  Text,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import ThemeSwitcher from "../ThemeToggle/";
import hideIcon from "../../assets/icon-hide-sidebar.svg";
import { getAuth } from "firebase/auth";
import { BellIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { database } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
function DrawerFooter({ closeDrawer }: { closeDrawer: () => void }) {
  const [notifications, setNotifications] = useState([]);
  const { colorMode } = useColorMode();
  const user = getAuth().currentUser;

  useEffect(() => {
    const userRef = doc(database, "users", user?.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      setNotifications(doc.data()?.notifications);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <VStack w="100%" alignItems={"flex-start"} gap="0.375rem" pr="1.5rem">
      <ThemeSwitcher />
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
      <Divider ml="1.5rem" mb="1rem" />
      {user && (
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          w="100%"
          pl="1.5rem"
          py="0.5rem"
          pr="0.5rem"
          borderRadius={"10px"}
        >
          <Link to={{ pathname: "/profile" }}>
            <Flex gap="0.5rem">
              <Avatar
                size={"sm"}
                name={user.displayName as string}
                src={user?.photoURL as string}
              />
              <Text>{user.displayName}</Text>
            </Flex>
          </Link>
          <Link to={{ pathname: "/profile/notifications" }}>
            <Flex
              alignItems={"center"}
              position={"relative"}
              role="group"
              cursor={"pointer"}
            >
              <BellIcon
                color="medium_Grey"
                _groupHover={{
                  color:
                    colorMode === "dark"
                      ? "light_grey_light_bg"
                      : "very_dark_grey_dark_bg",
                }}
                w="20px"
                h="20px"
              />
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                position={"absolute"}
                top="-4px"
                right={"-4px"}
                borderRadius={"full"}
                p="1px"
                h="12px"
                w="12px"
                bg={"medium_Grey"}
                _groupHover={{
                  bg:
                    colorMode === "dark"
                      ? "light_grey_light_bg"
                      : "very_dark_grey_dark_bg",
                }}
              >
                <Text
                  fontSize={"sm"}
                  lineHeight={"12px"}
                  textAlign={"center"}
                  _groupHover={{
                    color: colorMode === "dark" ? "black" : "white",
                  }}
                >
                  {notifications.length}
                </Text>
              </Flex>
            </Flex>
          </Link>
        </Flex>
      )}
    </VStack>
  );
}

export default DrawerFooter;
