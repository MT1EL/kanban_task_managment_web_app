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
import { updateColumn } from "../firebaseFunctions/table";

function Home({ setrCurrentBoard, currentBoard, boards }: any) {
  const [columns, setColumns] = useState(currentBoard.columns);
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
      const column = columns.find(
        (col: { name: string }) => col.name === source.droppableId
      );
      if (!column) {
        return; // Column not found
      }

      const newTasks = [...column.tasks];
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const newColumns = columns.map((col: { name: string }) =>
        col.name === source.droppableId ? { ...col, tasks: newTasks } : col
      );

      setColumns(newColumns);
    } else {
      // Moving between columns
      const sourceColumn = columns.find(
        (col: { name: string }) => col.name === source.droppableId
      );
      const destinationColumn = columns.find(
        (col: { name: string }) => col.name === destination.droppableId
      );

      if (!sourceColumn || !destinationColumn) {
        return; // Source or destination column not found
      }

      const sourceTasks = [...sourceColumn.tasks];
      const destinationTasks = [...destinationColumn.tasks];

      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);

      const newColumns = columns.map((col: { name: string }) => {
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

  const handleTaskDelete = () => {
    let newColumns = [...columns];
    newColumns.map((column) => {
      if (column.name === selectedTask.status) {
        const index = column.tasks.indexOf(selectedTask);
        column.tasks.splice(index, 1);
      }
    });
    setColumns(newColumns);
    onCloseDeleteModal();
    updateColumn(currentBoard.id, newColumns as any);
  };
  console.log(currentBoard);
  return (
    <Flex gap="1rem" minW="100%" h="calc(100% - 90px)">
      <MyDrawer
        boards={boards}
        setColumns={setColumns}
        currentBoard={currentBoard}
        setrCurrentBoard={setrCurrentBoard}
      />
      <Grid
        gridTemplateColumns={`repeat(${data?.boards?.length + 1}, 280px)`}
        gap="3"
        m="1.5rem"
        overflowX={"scroll"}
        h="fit-content"
        minH={"100%"}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          {columns?.map((column: any) => (
            <VStack gap="2.5rem" key={column.name} alignItems={"start"}>
              <ColumnsHeader
                name={column.name}
                taskLength={column.tasks.length}
              />
              <Droppable droppableId={column.name} key={column.name}>
                {(provided) => (
                  <VStack
                    gap="1.25rem"
                    alignItems={"start"}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    h="100%"
                    w={"280px"}
                  >
                    {column?.tasks?.map((todo: any, index: number) => (
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
                              subTasks_title={`0 of ${todo?.subtasks?.length} subtasks`}
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
        columns={columns}
        board_id={currentBoard.id}
      />
      <EditBoard
        isOpen={isEditBoardOpen}
        onClose={onEditBoardClose}
        columns={currentBoard.columns}
        name={currentBoard.name}
        id={currentBoard.id}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        onDeleteClick={handleTaskDelete}
        title={"Delete this task?"}
      />
    </Flex>
  );
}

export default Home;
