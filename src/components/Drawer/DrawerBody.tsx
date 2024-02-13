import { Text, VStack, Img, Flex, Box } from "@chakra-ui/react";
import board from "../../assets/icon-board.svg";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useDragEndBoards from "../hooks/useDragEndBoards";
import { Dispatch } from "react";

function DrawerBody({
  handleNewBoard,
  boards,
  currentBoard,
  setCurrentBoard,
  setBoardId,
}: {
  handleNewBoard: () => void;
  boards: any[];
  currentBoard: any;
  setCurrentBoard: any;
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
      <VStack>
        <DragDropContext
          onDragEnd={(result) => useDragEndBoards(result, boards)}
        >
          <Droppable droppableId={"BOARDSCOL"}>
            {(provided) => (
              <VStack
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
              >
                {boards?.map((item, index) => (
                  <Draggable
                    key={item.name}
                    draggableId={item.name}
                    index={index}
                  >
                    {(provided) => (
                      <Flex
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        gap="1rem"
                        bg={
                          currentBoard?.name === item.name
                            ? "main_purple"
                            : "transparent"
                        }
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
                        color={
                          currentBoard?.name === item.name
                            ? "white"
                            : "medium_Grey"
                        }
                        _hover={{
                          bg: "main_purple",
                          color: "white",
                        }}
                      >
                        <Img src={board} alt="board" />
                        <Text fontSize={"md"}>{item.name}</Text>
                      </Flex>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </VStack>
            )}
          </Droppable>
        </DragDropContext>
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
      </VStack>
    </Box>
  );
}

export default DrawerBody;
