import { Flex, useDisclosure } from "@chakra-ui/react";
import MyDrawer from "../components/Drawer/MyDrawer";
import TaskModal from "../components/Modals/TaskModal";
import { useState } from "react";
import NewTaskModal from "../components/Modals/NewTaskModal";
import DeleteModal from "../components/Modals/DeleteModal";
import { DropResult } from "react-beautiful-dnd";
import { updateColumn } from "../firebaseFunctions/table";
import TaskLayout from "../layouts/Tasks/";
function Home({ setCurrentBoard, currentBoard, boards, setBoards }: any) {
  const [columns, setColumns] = useState(currentBoard.columns);

  return (
    <Flex gap="1rem" minW="100%" h="calc(100% - 90px)">
      <MyDrawer
        boards={boards}
        setColumns={setColumns}
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
        setBoards={setBoards}
      />
      <TaskLayout
        boards={boards}
        columns={columns}
        currentBoard={currentBoard}
        setBoards={setBoards}
        setColumns={setColumns}
      />
    </Flex>
  );
}

export default Home;
