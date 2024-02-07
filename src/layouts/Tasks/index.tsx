import { useState } from "react";
import {
  Flex,
  Grid,
  VStack,
  useDisclosure,
  Text,
  useColorMode,
  Box,
} from "@chakra-ui/react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { BoardInterface, columnType, taskType } from "../../types";
import ColumnsHeader from "../../components/Header/ColumnsHeader";
import EditBoard from "../../components/Modals/EditBoard";
import Card from "../../components/Card/";
import { updateBoard, updateColumn } from "../../firebaseFunctions/table";
import TaskModal from "../../components/Modals/TaskModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import NewTaskModal from "../../components/Modals/NewTaskModal";
function index({ currentBoard }: { currentBoard: BoardInterface }) {
  const [selectedTask, setSelectedTask] = useState<taskType | null>(null);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditBoardOpen,
    onOpen: onEditBoardOpen,
    onClose: onEditBoardClose,
  } = useDisclosure();

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

  const handleTaskDelete = () => {
    let newColumns = [...currentBoard.columns];
    newColumns.map((column) => {
      if (
        selectedTask &&
        column.name === currentBoard.columns[selectedTask.status].name
      ) {
        const index = column.tasks.indexOf(selectedTask);
        column.tasks.splice(index, 1);
      }
    });
    onCloseDeleteModal();
    updateColumn(currentBoard.id, newColumns as any);
  };
  return (
    <Grid
      gridTemplateColumns={`repeat(${currentBoard.columns?.length + 1}, 280px)`}
      gap="3"
      m="1.5rem"
      overflowX={"scroll"}
      h="fit-content"
      minH={"100%"}
    >
      <EditBoard
        isOpen={isEditBoardOpen}
        onClose={onEditBoardClose}
        currentBoard={currentBoard}
      />
      <DragDropContext
        onDragEnd={(result) => handleDragEnd(result, currentBoard)}
      >
        {currentBoard.columns?.map((column: any) => (
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
                  {column?.tasks?.map((task: taskType, index: number) => (
                    <Draggable
                      key={task.title}
                      draggableId={task.title}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          w="100%"
                        >
                          <Card
                            title={task.title}
                            subTasks_title={`0 of ${task?.subtasks?.length} subtasks`}
                            handleClick={() => {
                              setSelectedTask(task);
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
      {selectedTask && (
        <>
          <TaskModal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedTask?.title}
            description={selectedTask?.description}
            subtasks={selectedTask?.subtasks}
            status={selectedTask?.status}
            onEditClick={onOpenEditModal}
            onDeleteClick={onOpenDeleteModal}
            columns={currentBoard.columns}
          />

          <NewTaskModal
            isOpen={isEditModalOpen}
            onClose={onCloseEditModal}
            title={"Edit Task"}
            buttonLabel={"Save Changes"}
            selectedTask={selectedTask}
            currentBoard={currentBoard}
          />
        </>
      )}

      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        onDeleteClick={handleTaskDelete}
        title={"Delete this task?"}
      />
    </Grid>
  );
}

export default index;

const handleDragEnd = (result: DropResult, currentBoard: BoardInterface) => {
  if (!result.destination) {
    return;
  }

  const { source, destination } = result;

  if (source.droppableId === destination.droppableId) {
    // Reordering within the same column
    const column = currentBoard.columns.find(
      (col: { name: string }) => col.name === source.droppableId
    );
    if (!column) {
      return; // Column not found
    }

    const newTasks = [...column.tasks];
    const [removed] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, removed);

    const newColumns: columnType[] = currentBoard.columns.map(
      (col: columnType) =>
        col.name === source.droppableId ? { ...col, tasks: newTasks } : col
    );

    const newBoard = { name: currentBoard.name, columns: newColumns };
    updateBoard(newBoard as BoardInterface, currentBoard.id);
  } else {
    // Moving between columns
    const sourceColumn = currentBoard.columns.find(
      (col: { name: string }) => col.name === source.droppableId
    );
    const destinationColumn = currentBoard.columns.find(
      (col: { name: string }) => col.name === destination.droppableId
    );

    if (!sourceColumn || !destinationColumn) {
      return; // Source or destination column not found
    }

    const sourceTasks = [...sourceColumn.tasks];
    const destinationTasks = [...destinationColumn.tasks];

    const [removed] = sourceTasks.splice(source.index, 1);
    removed.status = currentBoard.columns.indexOf(destinationColumn);
    destinationTasks.splice(destination.index, 0, removed);

    const newColumns: columnType[] = currentBoard.columns.map(
      (col: columnType) => {
        if (col.name === source.droppableId) {
          return { ...col, tasks: sourceTasks };
        }
        if (col.name === destination.droppableId) {
          return { ...col, tasks: destinationTasks };
        }
        return col;
      }
    );
    const newBoard = { name: currentBoard.name, columns: newColumns };
    updateBoard(newBoard as BoardInterface, currentBoard.id);
  }
};
