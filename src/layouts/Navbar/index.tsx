import {
  Divider,
  Flex,
  Img,
  useColorMode,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import elipsis from "../../assets/icon-vertical-ellipsis.svg";
import Logo from "../../components/Logo";
import addTask from "../../assets/icon-add-task-mobile.svg";
import NewTaskModal from "../../components/Modals/NewTaskModal";
function index({ currentBoard }: any) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Img src={elipsis} alt="elipsis" />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default index;
