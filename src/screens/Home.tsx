import { Flex } from "@chakra-ui/react";
import MyDrawer from "../components/Drawer/MyDrawer";
import { useState } from "react";
import TaskLayout from "../layouts/Tasks/";
function Home({ setCurrentBoard, currentBoard, boards }: any) {
  const [columns, setColumns] = useState(currentBoard.columns);

  return (
    <Flex gap="1rem" minW="100%" h="calc(100% - 90px)">
      <MyDrawer
        boards={boards}
        setColumns={setColumns}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
      />
      <TaskLayout currentBoard={currentBoard} setColumns={setColumns} />
    </Flex>
  );
}

export default Home;
