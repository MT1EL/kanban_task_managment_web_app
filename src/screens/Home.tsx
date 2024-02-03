import {
  Flex,
  Grid,
  VStack,
  useDisclosure,
  Text,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import MyDrawer from "../components/Drawer/MyDrawer";
import data from "../../data.json";
import Card from "../components/Card/";
import ColumnsHeader from "../components/Header/ColumnsHeader";
import TaskModal from "../components/Modals/TaskModal";
import { useState } from "react";
import NewTaskModal from "../components/Modals/NewTaskModal";
import DeleteModal from "../components/Modals/DeleteModal";
import EditBoard from "../components/Modals/EditBoard";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

function Home() {
  const [columns, setColumns] = useState(data.boards[0].columns);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  const {
    isOpen: isEditBoardOpen,
    onOpen: onEditBoardOpen,
    onClose: onEditBoardClose,
  } = useDisclosure();

  const { colorMode } = useColorMode();
  const [selectedTask, setSelectedTask] = useState<any>();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const column = columns.find((col) => col.name === source.droppableId);
      if (!column) {
        return; // Column not found
      }

      const newTasks = [...column.tasks];
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const newColumns = columns.map((col) =>
        col.name === source.droppableId ? { ...col, tasks: newTasks } : col
      );

      setColumns(newColumns);
    } else {
      // Moving between columns
      const sourceColumn = columns.find(
        (col) => col.name === source.droppableId
      );
      const destinationColumn = columns.find(
        (col) => col.name === destination.droppableId
      );

      if (!sourceColumn || !destinationColumn) {
        return; // Source or destination column not found
      }

      const sourceTasks = [...sourceColumn.tasks];
      const destinationTasks = [...destinationColumn.tasks];

      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);

      const newColumns = columns.map((col) => {
        if (col.name === source.droppableId) {
          return { ...col, tasks: sourceTasks };
        }
        if (col.name === destination.droppableId) {
          return { ...col, tasks: destinationTasks };
        }
        return col;
      });

      setColumns(newColumns);
    }
  };
  return (
    <Flex gap="1rem" w="100%" h="calc(100% - 90px)">
      <MyDrawer />
      <Grid
        gridTemplateColumns={`repeat(${data?.boards?.length + 1}, 280px)`}
        gap="3"
        m="1.5rem"
        overflowX={"scroll"}
        h="fit-content"
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          {columns.map((board) => (
            <VStack gap="2.5rem" key={board.name} alignItems={"start"}>
              <ColumnsHeader
                name={board.name}
                taskLength={board.tasks.length}
              />
              <Droppable droppableId={board.name} key={board.name}>
                {(provided) => (
                  <VStack
                    gap="1.25rem"
                    alignItems={"start"}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    h="100%"
                    w={"280px"}
                  >
                    {board.tasks.map((todo, index) => (
                      <Draggable
                        key={todo.title}
                        draggableId={todo.title}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            w="100%"
                          >
                            <Card
                              title={todo.title}
                              subTasks_title={`0 of ${todo.subtasks.length} subtasks`}
                              handleClick={() => {
                                setSelectedTask(todo);
                                onOpen();
                              }}
                            />
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </VStack>
          ))}
        </DragDropContext>
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          bg={colorMode === "dark" ? "#2B2C37" : "#E9EFFA"}
          borderRadius={"6px"}
          mt="3.625rem"
          onClick={onEditBoardOpen}
        >
          <Text fontWeight={"bold"} fontSize={"xl"} color="medium_Grey">
            + New Column
          </Text>
        </Flex>
      </Grid>
      <TaskModal
        isOpen={isOpen}
        onClose={onClose}
        title={selectedTask?.title}
        description={selectedTask?.description}
        subtasks={selectedTask?.subtasks}
        status={selectedTask?.status}
        onEditClick={onOpenEditModal}
        onDeleteClick={onOpenDeleteModal}
      />
      <NewTaskModal
        isOpen={isEditModalOpen}
        onClose={onCloseEditModal}
        title={"Edit Task"}
        buttonLabel={"Save Changes"}
        taskTitle={selectedTask?.title}
        description={selectedTask?.descritpion}
        subtasks={selectedTask?.subtasks}
        status={selectedTask?.status}
      />
      <EditBoard
        isOpen={isEditBoardOpen}
        onClose={onEditBoardClose}
        columns={data.boards[0].columns}
        name={data.boards[0].name}
      />
      <DeleteModal isOpen={isOpenDeleteModal} onClose={onCloseDeleteModal} />
    </Flex>
  );
}

export default Home;
