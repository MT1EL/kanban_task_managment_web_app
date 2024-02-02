import {
  Text,
  Flex,
  Grid,
  Box,
  VStack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import MyDrawer from "../components/Drawer/MyDrawer";
import data from "../../data.json";
import Card from "../components/Card/";
import ColumnsHeader from "../components/Header/ColumnsHeader";
import TaskModal from "../components/Modals/TaskModal";
function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex gap="1rem" w="100%" h="calc(100% - 90px)">
      <MyDrawer />
      <Grid
        gridTemplateColumns={`repeat(${data.boards.length}, 280px)`}
        gap="3"
        m="1.5rem"
      >
        {data.boards[0]?.columns.map((board) => (
          <VStack gap="2.5rem" key={board.name} alignItems={"start"}>
            <ColumnsHeader name={board.name} taskLength={board.tasks.length} />
            <VStack gap="1.25rem" alignItems={"start"}>
              {board.tasks.map((todo) => (
                <Box key={todo.title} w="100%">
                  <Card
                    title={todo.title}
                    subTasks_title={`0 of ${todo.subtasks.length} subtasks`}
                    handleClick={onOpen}
                  />
                  <TaskModal
                    isOpen={isOpen}
                    onClose={onClose}
                    title={todo.title}
                    description={todo.description}
                    subtasks={todo.subtasks}
                    status={todo.status}
                  />
                </Box>
              ))}
            </VStack>
          </VStack>
        ))}
      </Grid>
    </Flex>
  );
}

export default Home;
