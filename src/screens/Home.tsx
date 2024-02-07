import { Flex } from "@chakra-ui/react";
import MyDrawer from "../components/Drawer/MyDrawer";
import TaskLayout from "../layouts/Tasks/";
function Home({ setCurrentBoard, currentBoard, boards }: any) {
  return (
    <Flex gap="1rem" minW="100%" h="calc(100% - 90px)">
      <MyDrawer
        boards={boards}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
      />
      <TaskLayout currentBoard={currentBoard} />
    </Flex>
  );
}

export default Home;
