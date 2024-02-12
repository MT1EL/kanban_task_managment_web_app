import {
  Divider,
  Flex,
  Img,
  useColorMode,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Logo from "../../components/Logo";
import addTask from "../../assets/icon-add-task-mobile.svg";
import NewTaskModal from "../../components/Modals/NewTaskModal";
import Popover from "../../components/Popover/";
import DeleteModal from "../../components/Modals/DeleteModal";
import { deleteBoard } from "../../firebaseFunctions/table";
import EditBoard from "../../components/Modals/EditBoard";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase";
import { getAuth } from "firebase/auth";
function index({ currentBoard, setCurrentBoard, boards }: any) {
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
          />
        </Flex>
      </Flex>
      <EditBoard
        isOpen={isEditBoardOpen}
        onClose={onEditBoardClose}
        currentBoard={currentBoard}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onDeleteClick={() => {
          deleteBoard(currentBoard.id);
          onDeleteModalClose();
          if (boards.length === 1) {
            //იდეაში საერთოდ არ არის Boards ები შესაბამისად currentBoard იც არ არსებობს
            //მაგრამ სანამ currentBoard-ს null ად გავსეტავ
            //მანამდე უნდა დავწერო handler ი მაგ თუ currentBoard Nullია
            setCurrentBoard(boards[0]);
          } else {
            setCurrentBoard(boards[0]);
          }
          const user = getAuth().currentUser;
          if (user) {
            const ref = doc(database, "users", user?.uid);
            const boardIds = boards.map((board: any) => board.id);
            const filteredBoards = boardIds.filter(
              (id: any) => id !== currentBoard.id
            );
            updateDoc(ref, { boards: filteredBoards }).then(() =>
              console.log("success")
            );
          }
        }}
        title={"Delete this board?"}
      />
    </Flex>
  );
}

export default index;
