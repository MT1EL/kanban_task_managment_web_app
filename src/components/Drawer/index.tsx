import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  Text,
  VStack,
  Img,
  Flex,
  useColorMode,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import Logo from "../Logo";
import board from "../../assets/icon-board.svg";
import ThemeSwitcher from "../ThemeToggle/";
import hideIcon from "../../assets/icon-hide-sidebar.svg";
function CustomDrawer({ isOpen, onClose, setIsOpen }: any) {
  const { colorMode } = useColorMode();
  const [activeLink, setActiveLink] = useState("Platform Launch");
  const drawerLinks = ["Platform Launch", "Marketing Plan", "RoadMap"];
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerContent
        display={["none", "flex"]}
        maxW={["260px", "260px", "300px"]}
        borderRight={"1px solid"}
        borderColor={colorMode === "dark" ? "lines_dark" : "lines_light"}
      >
        <DrawerHeader p="0">
          <Stack justifyContent={"center"} h="90px">
            <Logo />
          </Stack>
        </DrawerHeader>

        <DrawerBody
          p="0"
          gap="1.125rem"
          display={"flex"}
          flexDir={"column"}
          pr="1.5rem"
        >
          <Text
            fontSize={"sm"}
            fontWeight={"bold"}
            letterSpacing={"wide"}
            color="medium_Grey"
            ml="2rem"
          >
            ALL BOARDS (8)
          </Text>
          <VStack>
            {drawerLinks.map((item) => (
              <Flex
                gap="1rem"
                bg={activeLink === item ? "main_purple" : "transparent"}
                w="100%"
                h="48px"
                alignItems={"center"}
                borderTopRightRadius={"100px"}
                borderBottomRightRadius={"100px"}
                pl="2rem"
                key={item}
                cursor={"pointer"}
                onClick={() => setActiveLink(item)}
                color={activeLink === item ? "white" : "medium_Grey"}
                _hover={{
                  bg: "main_purple",
                  color: "white",
                }}
              >
                <Img src={board} alt="board" />
                <Text fontSize={"md"}>{item}</Text>
              </Flex>
            ))}
            <Flex
              gap="1rem"
              w="100%"
              h="48px"
              alignItems={"center"}
              borderTopRightRadius={"100px"}
              borderBottomRightRadius={"100px"}
              pl="2rem"
              cursor={"pointer"}
              color="main_purple"
              _hover={{
                bg: "main_purple",
                color: "white",
              }}
            >
              <Img src={board} alt="board" />
              <Text fontWeight={"bold"} fontSize={"md"}>
                + Create New Board
              </Text>
            </Flex>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <VStack w="100%" alignItems={"flex-start"} gap="0.375rem">
            <ThemeSwitcher />
            <Flex
              gap="1rem"
              alignItems={"center"}
              cursor={"pointer"}
              py="0.5rem"
              px="1rem"
              borderRadius="1rem"
              _hover={{
                bg:
                  colorMode === "dark"
                    ? "very_dark_grey_dark_bg"
                    : "light_grey_light_bg",
              }}
              onClick={() => setIsOpen(false)}
            >
              <Img src={hideIcon} alt="hide sidebar" />
              <Text>Hide Sidebar</Text>
            </Flex>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CustomDrawer;
