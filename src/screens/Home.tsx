import {
  Flex,
  Grid,
  VStack,
  useDisclosure,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import MyDrawer from "../components/Drawer/MyDrawer";
import data from "../../data.json";
import Card from "../components/Card/";
import ColumnsHeader from "../components/Header/ColumnsHeader";
import TaskModal from "../components/Modals/TaskModal";
import { useState } from "react";
function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const [selectedTask, setSelectedTask] = useState<any>();

  return (
    <Flex gap="1rem" w="100%" h="calc(100% - 90px)">
      <MyDrawer />
      <Grid
        gridTemplateColumns={`repeat(${data.boards.length + 1}, 280px)`}
        gap="3"
        m="1.5rem"
        overflowX={"scroll"}
        h="fit-content"
      >
        {data.boards[0]?.columns.map((board) => (
          <VStack gap="2.5rem" key={board.name} alignItems={"start"}>
            <ColumnsHeader name={board.name} taskLength={board.tasks.length} />
            <VStack gap="1.25rem" alignItems={"start"}>
              {board.tasks.map((todo) => (
                <Card
                  title={todo.title}
                  subTasks_title={`0 of ${todo.subtasks.length} subtasks`}
                  handleClick={() => {
                    setSelectedTask(todo);
                    onOpen();
                  }}
                  key={todo.title}
                />
              ))}
            </VStack>
          </VStack>
        ))}
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          bg={colorMode === "dark" ? "#2B2C37" : "#E9EFFA"}
          borderRadius={"6px"}
          mt="3.625rem"
        >
          <Text fontWeight={"bold"} fontSize={"xl"} color="medium_Grey">
            + New Column
          </Text>
        </Flex>
      </Grid>
      {isOpen && selectedTask && (
        <TaskModal
          isOpen={isOpen}
          onClose={onClose}
          title={selectedTask.title}
          description={selectedTask.description}
          subtasks={selectedTask.subtasks}
          status={selectedTask.status}
        />
      )}
    </Flex>
  );
}

export default Home;
