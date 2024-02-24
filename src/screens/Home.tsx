import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import MyDrawer from "../components/Drawer/MyDrawer";
import TaskLayout from "../layouts/Tasks/";
import { useState } from "react";
function Home({ setCurrentBoard, currentBoard, setBoardId, boardId }: any) {
  const { isOpen: isBoardOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Flex
      pl={["unset", isOpen ? "300px" : "unset"]}
      gap="1rem"
      maxW="100vw"
      mt="90px"
      transition={"300ms ease-in-out"}
      h="100%"
    >
      <MyDrawer
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        isBoardOpen={isBoardOpen}
        onOpen={onOpen}
        onClose={onClose}
        setBoardId={setBoardId}
      />
      {currentBoard ? (
        <TaskLayout
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
          boardId={boardId}
        />
      ) : (
        <Flex
          justifyContent={"center"}
          flexDir={"column"}
          alignItems={"center"}
          w="100%"
          gap=".5rem"
        >
          <Text
            color="medium_Grey"
            fontSize={"18px"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            This workflow is empty. Create a new Board to get started.
          </Text>
          <Button maxW="300px" onClick={onOpen}>
            +Create New Board
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default Home;
