import { useColorMode, Spinner, Flex } from "@chakra-ui/react";
import ShowDrawer from "./ShowDrawer";
import DrawerFooter from "./DrawerFooter";
import DrawerBody from "./DrawerBody";
import EditBoard from "../Modals/EditBoard";
import { Dispatch, useEffect, useState } from "react";
import { BoardInterface } from "../../types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../../firebase";
import { getAuth } from "firebase/auth";
function MyDrawer({
  currentBoard,
  setCurrentBoard,
  setIsOpen,
  isOpen,
  isBoardOpen,
  onOpen,
  onClose,
  setBoardId,
}: {
  currentBoard: BoardInterface;
  setCurrentBoard: Dispatch<BoardInterface>;
  setIsOpen: Dispatch<boolean>;
  isOpen: boolean;
  isBoardOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setBoardId: Dispatch<string>;
}) {
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState<BoardInterface[]>([]);
  const { colorMode } = useColorMode();
  //get User Boards
  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      const unsubscribe = onSnapshot(
        query(
          collection(database, "boards"),
          where(
            "collaborators",
            "array-contains",
            user.uid || "ownerId" === user.uid
          )
        ),
        (snapshot) => {
          const boards: BoardInterface[] = [];
          snapshot.forEach((doc) => {
            boards.push({ ...doc.data(), id: doc.id } as BoardInterface);
          });
          setBoards(boards);
          setLoading(false);
        }
      );
      return unsubscribe;
    }
  }, []);
  return (
    <Flex
      minW={["260px", "260px", "301px"]}
      borderRight={"1px solid"}
      borderColor={colorMode === "dark" ? "lines_dark" : "lines_light"}
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
      height={"calc(100% - 90px)"}
      zIndex={2}
    >
      {loading ? (
        <Spinner />
      ) : (
        <DrawerBody
          handleNewBoard={onOpen}
          boards={boards}
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
          setBoardId={setBoardId}
        />
      )}
      <DrawerFooter closeDrawer={() => setIsOpen(false)} />
      <ShowDrawer isOpen={isOpen} setOpen={() => setIsOpen(true)} />
      <EditBoard isOpen={isBoardOpen} onClose={onClose} />
    </Flex>
  );
}

export default MyDrawer;
