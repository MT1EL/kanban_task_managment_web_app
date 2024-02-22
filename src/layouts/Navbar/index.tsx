import {
  Divider,
  Flex,
  Img,
  useColorMode,
  Text,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Logo from "../../components/Logo";
import addTask from "../../assets/icon-add-task-mobile.svg";
import NewTaskModal from "../../components/Modals/NewTaskModal";
import Popover from "../../components/Popover/";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditBoard from "../../components/Modals/EditBoard";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { BoardInterface } from "../../types";
import { Dispatch } from "react";
function index({
  currentBoard,
  setCurrentBoard,
}: {
  currentBoard: BoardInterface;
  setCurrentBoard: Dispatch<BoardInterface | boolean>;
}) {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditBoardOpen,
    onOpen: onEditBoardOpen,
    onClose: onEditBoardClose,
  } = useDisclosure();
  return (
    <Flex
      alignItems={"center"}
      h="90px"
      bg={colorMode === "dark" ? "dark_Grey" : "white"}
      borderColor={colorMode === "dark" ? "lines_dark" : "lines_light"}
      borderBottomWidth={"1px"}
      borderBottomStyle={"solid"}
      px={["1rem", "0"]}
      position={"fixed"}
      top="0"
      w="100%"
      zIndex={"10"}
    >
      <NewTaskModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Add New Task"}
        buttonLabel={"Create Task"}
        currentBoard={currentBoard}
      />
      <Logo />
      <Divider
        bg={colorMode === "dark" ? "lines_dark" : "lines_light"}
        orientation="vertical"
      />
      {currentBoard ? (
        <Flex
          pl={["1rem", "1.5rem"]}
          pr={["0", "2rem"]}
          alignItems={"center"}
          justifyContent={"space-between"}
          w="100%"
          h="100%"
        >
          <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
            {currentBoard?.name}
          </Text>
          <Flex alignItems={"center"} gap={["1rem", "1.5rem"]}>
            <Button variant={"primary"} size={["xs", "xl"]} onClick={onOpen}>
              <Img src={addTask} alt="add task" display={["block", "none"]} />
              <Text display={["none", "block"]}>+Add New Task</Text>
            </Button>
            <Popover
              editTitle="Edit Board"
              deleteTitle="Delete Board"
              onClose={() => console.log("clicked")}
              onDeleteClick={onDeleteModalOpen}
              onEditClick={onEditBoardOpen}
              currentBoard={currentBoard}
              addColaborator={true}
            />
          </Flex>
        </Flex>
      ) : null}
      <EditBoard
        isOpen={isEditBoardOpen}
        onClose={onEditBoardClose}
        currentBoard={currentBoard}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onDeleteClick={() => {
          const user = getAuth().currentUser;
          if (user?.uid === currentBoard?.ownerId) {
            const boardRef = doc(database, "boards", currentBoard.id);
            deleteDoc(boardRef)
              .then(() => {
                setCurrentBoard(false);
                toast({
                  title: "Board deleted",
                  status: "success",
                });
              })
              .catch((error) => console.error("Error deleting board", error));
          } else {
            toast({
              title: "You don't have permission to delete this board",
              status: "warning",
            });
          }
          onDeleteModalClose();
        }}
        title={"Delete this board?"}
      />
    </Flex>
  );
}

export default index;
