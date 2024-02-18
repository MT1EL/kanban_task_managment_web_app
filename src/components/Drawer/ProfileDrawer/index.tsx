import {
  Divider,
  Flex,
  TabList,
  Text,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import { Dispatch, useState } from "react";
import DrawerFooter from "../DrawerFooter";
function index({
  currentLink,
  setCurrentLink,
}: {
  currentLink: number;
  setCurrentLink: Dispatch<any>;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const { colorMode } = useColorMode();
  const profileLinks = ["Profile", "Boards", "Security", "Notifications"];
  return (
    <Flex
      display={["none", "flex"]}
      minW={["260px", "260px", "301px"]}
      borderRight={"1px solid"}
      borderColor={colorMode === "dark" ? "lines_dark" : "lines_light"}
      height={"calc(100% - 90px)"}
      boxShadow={"none"}
      flexDir={"column"}
      justifyContent={"space-between"}
      pb="1rem"
      bg={colorMode === "dark" ? "dark_Grey" : "white"}
      transform={isOpen ? "translateX(0%)" : "translateX(-100%)"}
      transition={"300ms ease-in-out"}
      position={"fixed"}
      top="90px"
      left="0"
    >
      <Box>
        <Text fontSize={"xl"} px="2rem">
          Profile
        </Text>
        <Divider my="1rem" />
        <Flex flexDir={"column"} gap="0.5rem">
          {profileLinks.map((link, index) => (
            <Flex
              gap="1rem"
              w="100%"
              h="48px"
              alignItems={"center"}
              borderTopRightRadius={"100px"}
              borderBottomRightRadius={"100px"}
              pl="2rem"
              cursor={"pointer"}
              _hover={{
                color: "white",
              }}
              color={(index as any) === currentLink ? "white" : "medium_Grey"}
              onClick={() => setCurrentLink(index)}
              maxW="80%"
              key={link}
            >
              <Text fontSize={"ms"}>{link}</Text>
            </Flex>
          ))}
        </Flex>
      </Box>
      <DrawerFooter closeDrawer={() => setIsOpen(false)} />
    </Flex>
  );
}

export default index;
