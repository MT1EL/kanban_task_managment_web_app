import { Flex, Spinner } from "@chakra-ui/react";
import MyDrawer from "../components/Drawer/MyDrawer";
import TaskLayout from "../layouts/Tasks/";
import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../../firebase";
function Home({ boards, setCurrentBoard }: any) {
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
    <Flex gap="1rem" minW="100%" h="calc(100% - 90px)">
      <MyDrawer
        boards={boards}
        currentBoard={localCurrentBoard}
        setCurrentBoard={setCurrentBoard}
        setLocalCurrentBoard={setLocalCurrentBoard}
        setRefetch={setRefetch}
      />
      <TaskLayout currentBoard={localCurrentBoard} />
    </Flex>
  );
}

export default Home;
