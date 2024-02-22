import { Text, VStack, Img, Flex, Box } from "@chakra-ui/react";
import board from "../../assets/icon-board.svg";
import { Dispatch } from "react";
import { BoardInterface } from "../../types";

function DrawerBody({
  handleNewBoard,
  boards,
  currentBoard,
  setCurrentBoard,
  setBoardId,
}: {
  handleNewBoard: () => void;
  boards: BoardInterface[];
  currentBoard: BoardInterface | null;
  setCurrentBoard: Dispatch<BoardInterface>;
  setBoardId: Dispatch<string>;
}) {
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
        ALL BOARDS ({boards?.length})
      </Text>
      <VStack w="100%">
        {boards?.map((item) => (
          <Flex
            gap="1rem"
            bg={currentBoard?.id === item.id ? "main_purple" : "transparent"}
            w="100%"
            h="48px"
            alignItems={"center"}
            borderTopRightRadius={"100px"}
            borderBottomRightRadius={"100px"}
            pl="2rem"
            cursor={"pointer"}
            onClick={() => {
              setBoardId(item.id);
              setCurrentBoard(item);
            }}
            color={currentBoard?.id === item.id ? "white" : "medium_Grey"}
            _hover={{
              bg: "main_purple",
              color: "white",
            }}
          >
            <Img src={board} alt="board" />
            <Flex flexDir={"column"}>
              <Text fontSize={"ms"}>{item.name}</Text>
              <Text fontSize={"xs"}>
                {item.createdBy.email
                  ? item.createdBy.email
                  : item.createdBy.name}
              </Text>
            </Flex>
          </Flex>
        ))}
      </VStack>
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
        onClick={handleNewBoard}
      >
        <Img src={board} alt="board" />
        <Text fontWeight={"bold"} fontSize={"md"}>
          + Create New Board
        </Text>
      </Flex>
    </Box>
  );
}

export default DrawerBody;
