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
import { BoardInterface } from "../../types";
function index({ currentBoard, setBoards, setCurrentBoard, boards }: any) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
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
    >
      <NewTaskModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Add New Task"}
        buttonLabel={"Create Task"}
        columns={currentBoard.columns}
        board_id={currentBoard.id}
        board_name={currentBoard.name}
        setCurrentBoard={setCurrentBoard}
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
          {currentBoard.name}
        </Text>
        <Flex alignItems={"center"} gap={["1rem", "1.5rem"]}>
          <Button variant={"primary"} size={["xs", "xl"]} onClick={onOpen}>
            <Img src={addTask} alt="add task" display={["block", "none"]} />
            <Text display={["none", "block"]}>+Add New Task</Text>
          </Button>
          <Popover
            onClose={() => console.log("clicked")}
            onDeleteClick={onDeleteModalOpen}
            onEditClick={() => console.log("clicked")}
          />
        </Flex>
      </Flex>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onDeleteClick={() => {
          deleteBoard(currentBoard.id);
          onDeleteModalClose();
          setBoards((prev: any) =>
            prev.filter((board: BoardInterface) => board.id !== currentBoard.id)
          );
          setrCurrentBoard(boards[0]);
        }}
        title={"Delete this board?"}
      />
    </Flex>
  );
}

export default index;
