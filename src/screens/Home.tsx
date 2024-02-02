import { Flex, Grid, Box, VStack, useDisclosure } from "@chakra-ui/react";
import MyDrawer from "../components/Drawer/MyDrawer";
import data from "../../data.json";
import Card from "../components/Card/";
import ColumnsHeader from "../components/Header/ColumnsHeader";
import TaskModal from "../components/Modals/TaskModal";
import { useState } from "react";
function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<any>();

  const getCompletedCount = ({ subtasks }: any) => {
    // Initialize a variable to count completed tasks
    let completedTasks = 0;

    // Iterate over each subtask
    subtasks.forEach((subtask: { isCompleted: any }) => {
      // Check if the subtask is completed
      if (subtask.isCompleted) {
        // Increment the completedTasks counter
        completedTasks++;
      }
    });
  };

  return (
    <Flex gap="1rem" w="100%" h="calc(100% - 90px)">
      <MyDrawer />
      <Grid
        gridTemplateColumns={`repeat(${data.boards.length}, 280px)`}
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
