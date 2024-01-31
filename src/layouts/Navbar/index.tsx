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
import CustomDrawer from "../../components/Drawer";
import addTask from "../../assets/icon-add-task-mobile.svg";
import { useState } from "react";
function index() {
  const [isOpen, setIsOpen] = useState(true);
  const { colorMode } = useColorMode();
  const { onOpen, onClose } = useDisclosure();

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
      <Logo />
      <Divider
        bg={colorMode === "dark" ? "lines_dark" : "lines_light"}
        orientation="vertical"
        h="100%"
        w="1px"
        display={["none", "block"]}
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
          Platform Launch
        </Text>
        <Flex alignItems={"center"} gap={["1rem", "1.5rem"]}>
          <Button variant={"primary"} size={["xs", "xl"]} onClick={onOpen}>
            <Img src={addTask} alt="add task" display={["block", "none"]} />
            <Text display={["none", "block"]}>+Add New Task</Text>
          </Button>
          <Img src={elipsis} alt="elipsis" />
        </Flex>
      </Flex>
      <CustomDrawer isOpen={isOpen} onClose={onClose} setIsOpen={setIsOpen} />
    </Flex>
  );
}

export default index;
