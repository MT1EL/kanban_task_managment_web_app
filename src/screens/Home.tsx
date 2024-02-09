import { Box, Flex, Spinner } from "@chakra-ui/react";
import MyDrawer from "../components/Drawer/MyDrawer";
import TaskLayout from "../layouts/Tasks/";
import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../../firebase";
function Home({ boards, setCurrentBoard }: any) {
  const [isOpen, setIsOpen] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [localCurrentBoard, setLocalCurrentBoard] = useState(boards[0]);
  const previousBoardsRef = useRef([]);
  useEffect(() => {
    const boardRef = doc(database, "boards", localCurrentBoard.id);
    const unsubscribe = onSnapshot(boardRef, (doc) => {
      const updatedBoards = {
        id: doc?.id,
        ...doc?.data(),
      };
      if (localCurrentBoard) {
        setLocalCurrentBoard(updatedBoards as any);
      } else {
        setLocalCurrentBoard(updatedBoards as any);
      }
    });

    return () => unsubscribe();
  }, [refetch]);
  useEffect(() => {
    if (boards.length < previousBoardsRef.current.length) {
      setLocalCurrentBoard(boards[0]);
    }
    // Update previousBoardsRef after each render
    previousBoardsRef.current = boards;
  }, [boards]);
  if (!localCurrentBoard) {
    return <Spinner />;
  }
  return (
    <Flex
      pl={isOpen ? "300px" : "unset"}
      gap="1rem"
      minW="100%"
      mt="90px"
      transition={"300ms ease-in-out"}
    >
      <MyDrawer
        boards={boards}
        currentBoard={localCurrentBoard}
        setCurrentBoard={setCurrentBoard}
        setLocalCurrentBoard={setLocalCurrentBoard}
        setRefetch={setRefetch}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <TaskLayout currentBoard={localCurrentBoard} isDrawerOpen={isOpen} />
    </Flex>
  );
}

export default Home;
