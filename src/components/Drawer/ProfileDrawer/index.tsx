import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { Dispatch } from "react";
import DrawerFooter from "../DrawerFooter";
import { Link } from "react-router-dom";
import ShowDrawer from "../ShowDrawer";
function index({
  isDrawerOpen,
  setIsDrawerOpen,
  currentLink,
  setCurrentLink,
}: {
  currentLink: number;
  setCurrentLink: Dispatch<any>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<boolean>;
}) {
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
      transform={isDrawerOpen ? "translateX(0%)" : "translateX(-100%)"}
      transition={"300ms ease-in-out"}
      position={"fixed"}
      top="90px"
      left="0"
    >
      <Flex flexDir={"column"} gap="0.5rem" mt="2rem">
        {profileLinks.map((link, index) => (
          <Link
            to={
              link.toLocaleLowerCase() === "profile"
                ? "/profile"
                : `/profile/${link.toLowerCase()}`
            }
            key={link}
          >
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
                color: colorMode === "dark" ? "white" : "black",
              }}
              color={
                (index as any) === currentLink
                  ? colorMode === "dark"
                    ? "white"
                    : "black"
                  : "medium_Grey"
              }
              onClick={() => setCurrentLink(index)}
              maxW="80%"
            >
              <Text fontSize={"ms"}>{link}</Text>
            </Flex>
          </Link>
        ))}
      </Flex>
      <DrawerFooter closeDrawer={() => setIsDrawerOpen(false)} />
      <ShowDrawer isOpen={isDrawerOpen} setOpen={() => setIsDrawerOpen(true)} />
    </Flex>
  );
}

export default index;
