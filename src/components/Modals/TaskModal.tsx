import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  Checkbox,
  Select,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { TaskModalInterface } from "../../types";
import Popover from "../Popover/";
import { useFormik } from "formik";
import { useEffect } from "react";
import { taskModalOnSubmit } from "../../formik/onSubmit/taskModal";
function TaskModal({
  isOpen,
  onClose,
  title,
  description,
  subtasks,
  status,
  onEditClick,
  onDeleteClick,
  currentBoard,
  selectedTask,
}: TaskModalInterface) {
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      taskModalOnSubmit(values, currentBoard, selectedTask, status);
      formik.setValues({});
      onClose();
    },
  });
  const getInitialValues = () => {
    subtasks?.map((subtasks, index) => {
      formik.setFieldValue(`isCompleted${index}`, subtasks.isCompleted);
    });
  };
  useEffect(() => {
    getInitialValues();
  }, [selectedTask]);
  return (
    <Modal isOpen={isOpen} onClose={formik.handleSubmit}>
      <ModalOverlay />
      <ModalContent
        p="2rem"
        mx="1rem"
        gap="1.5rem"
        w="480px"
        maxW="100%"
        my="auto"
      >
        <ModalHeader p="0">
          <Flex
            gap="1.5rem"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontWeight={"bold"} fontSize={"18px"}>
              {title}
            </Text>
            <Popover
              onEditClick={onEditClick}
              onClose={onClose}
              onDeleteClick={onDeleteClick}
              editTitle={"Edit Task"}
              deleteTitle={"Delete Task"}
              currentBoard={currentBoard}
            />
          </Flex>
        </ModalHeader>
        <ModalBody gap="1.5rem" display={"flex"} flexDir={"column"} p="0">
          <Box>
            <Text
              fontSize={"13px"}
              lineHeight={"23px"}
              color="medium_Grey"
              fontWeight={"medium"}
            >
              {description}
            </Text>
          </Box>
          <Flex
            flexDir={"column"}
            gap="1rem"
            display={subtasks.length > 0 ? "flex" : "none"}
          >
            <Text fontSize={"sm"} color="medium_Grey" fontWeight={"bold"}>
              Subtasks ({selectedTask?.completedCount} of {subtasks?.length})
            </Text>
            <VStack gap="0.5rem" alignItems={"start"}>
              {Object.keys(formik.values)?.map(
                (subTask: string, index: number) => (
                  <Checkbox
                    key={index}
                    defaultChecked={subtasks && subtasks[index]?.isCompleted}
                    isChecked={
                      formik.values[subTask as keyof typeof formik.values]
                    }
                    onChange={formik.handleChange}
                    name={subTask}
                    id={subTask}
                  >
                    {subtasks[index]?.description}
                  </Checkbox>
                )
              )}
            </VStack>
          </Flex>
        </ModalBody>

        <ModalFooter flexDir={"column"} alignItems={"start"} gap="0.5rem" p="0">
          <Text color="medium_Grey" fontSize={"sm"} fontWeight={"bold"}>
            Current Status
          </Text>
          <Select
            placeholder={
              currentBoard?.columns && currentBoard?.columns[status]?.name
            }
            cursor={"pointer"}
            disabled
          ></Select>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TaskModal;
