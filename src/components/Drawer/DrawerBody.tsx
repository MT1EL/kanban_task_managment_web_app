import { useState } from "react";
import { Text, VStack, Img, Flex, Box } from "@chakra-ui/react";
import board from "../../assets/icon-board.svg";

function DrawerBody() {
  const [activeLink, setActiveLink] = useState("Platform Launch");

  const drawerLinks = ["Platform Launch", "Marketing Plan", "RoadMap"];

  return (
    <Box
      p="0"
      gap="1.125rem"
      display={"flex"}
      flexDir={"column"}
      pr="1.5rem"
      mt="1rem"
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
    </Box>
  );
}

export default DrawerBody;