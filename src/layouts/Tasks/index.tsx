import { Dispatch, useEffect, useState } from "react";
import {
  Flex,
  Grid,
  VStack,
  useDisclosure,
  Text,
  useColorMode,
  Box,
  Input,
} from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BoardInterface, taskType } from "../../types";
import ColumnsHeader from "../../components/Header/ColumnsHeader";
import EditBoard from "../../components/Modals/EditBoard";
import Card from "../../components/Card/";
import { updateColumn } from "../../firebaseFunctions/table";
import TaskModal from "../../components/Modals/TaskModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import NewTaskModal from "../../components/Modals/NewTaskModal";
import useDragEndTasks from "../../components/hooks/useDragEndTasks";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../../../firebase";
function index({
  currentBoard,
  setCurrentBoard,
  boardId,
}: {
  currentBoard: BoardInterface;
  setCurrentBoard: Dispatch<BoardInterface>;
  boardId: string;
}) {
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
    let newColumns = [...currentBoard?.columns];
    newColumns.map((column) => {
      if (
        selectedTask &&
        column.name === currentBoard?.columns[selectedTask.status].name
      ) {
        const index = column.tasks.indexOf(selectedTask);
        column.tasks.splice(index, 1);
      }
    });
    onCloseDeleteModal();
    updateColumn(currentBoard?.id, newColumns as any);
  };
  //listen to changes in the current board
  useEffect(() => {
    const currentBoardRef = doc(database, "boards", currentBoard.id);
    const unsubscribe = onSnapshot(currentBoardRef, (doc) => {
      setCurrentBoard({ ...doc.data(), id: doc.id } as BoardInterface);
    });
    return () => unsubscribe();
  }, [boardId]);
  return (
    <Grid
      gridTemplateColumns={`repeat(${
        currentBoard?.columns?.length + 1
      }, 280px)`}
      gap="3"
      m="1.5rem"
      h="fit-content"
    >
      <EditBoard
        isOpen={isEditBoardOpen}
        onClose={onEditBoardClose}
        currentBoard={currentBoard}
      />
      <DragDropContext
        onDragEnd={(result) => useDragEndTasks(result, currentBoard)}
      >
        {currentBoard?.columns?.map((column: any) => (
          <VStack gap="2.5rem" key={column.name} alignItems={"start"}>
            <ColumnsHeader
              column={column}
              boardId={boardId}
              columns={currentBoard?.columns}
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
                            subTasks_title={`${task.completedCount} of ${task?.subtasks?.length} subtasks`}
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
        minH="calc(100vh - 90px - 6.6rem)"
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
            selectedTask={selectedTask}
            onEditClick={onOpenEditModal}
            onDeleteClick={onOpenDeleteModal}
            currentBoard={currentBoard}
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
