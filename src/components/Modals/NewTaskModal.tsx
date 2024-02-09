import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Select,
  Flex,
  Input,
  Button,
  Img,
  Textarea,
} from "@chakra-ui/react";
import xIcon from "../../assets/icon-cross.svg";
import { useFormik } from "formik";
import { updateColumn } from "../../firebaseFunctions/table";
import { NewTaskModalInterface, columnType, subtaskType } from "../../types";

function NewTaskModal({
  isOpen,
  onClose,
  title,
  buttonLabel,
  selectedTask,
  currentBoard,
}: NewTaskModalInterface) {
  const getInitialValues = () => {
    let objToRerutn: { [x: string]: any } = {};
    if (selectedTask?.subtasks) {
      selectedTask?.subtasks.map((subtask: subtaskType, index: number) => {
        objToRerutn[`subtask${index}`] = subtask.description;
      });
    } else {
      objToRerutn.subtask0 = "";
      objToRerutn.subtask1 = "";
    }
    return objToRerutn;
  };
  const initialValuesObject: any = {
    title: selectedTask?.title ? selectedTask.title : "",
    description: selectedTask?.description ? selectedTask?.description : "",
    status: selectedTask?.status ? selectedTask?.status : 0,
  };
  const formik = useFormik({
    initialValues: { ...initialValuesObject, ...getInitialValues() },
    onSubmit: (values) => {
      let taskObj: any = { ...values };
      let subtaskArr: subtaskType[] = [];
      const taskObj_keys = Object.keys(taskObj).splice(3);

      taskObj_keys?.map((key) => {
        subtaskArr.push({ description: values[key], isCompleted: false });
        delete taskObj[key];
      });
      taskObj.subtasks = subtaskArr;
      let newColumns: columnType[] = [...currentBoard?.columns];
      newColumns?.map((column) => {
        if (column.name === currentBoard.columns[values.status].name) {
          if (
            column.tasks.some(
              (item) => JSON.stringify(item) === JSON.stringify(selectedTask)
            ) &&
            selectedTask
          ) {
            const taskIndex = column.tasks.indexOf(selectedTask);
            column.tasks[taskIndex] = taskObj;
          } else {
            column.tasks = [taskObj, ...column.tasks];
          }
        }
        if (selectedTask && selectedTask.status !== taskObj.status) {
          if (column.name === currentBoard.columns[selectedTask.status].name) {
            if (column.tasks.length === 1) {
              column.tasks = [];
            } else {
              const indexToRemove = column.tasks.indexOf(selectedTask);
              column.tasks.splice(indexToRemove, 1);
            }
          }
        }
      });
      updateColumn(currentBoard?.id, newColumns as any);
      onClose();
    },
  });
  const handleNewSubtask = () => {
    const formik_values_keys = Object.keys(formik.values);
    if (formik_values_keys.length > 0) {
      const newInitialValueName = `subtask${
        Object.keys(formik.values).length - 1
      }`;
      formik.setFieldValue(
        newInitialValueName,
        formik.values[newInitialValueName]
          ? formik.values[newInitialValueName]
          : ""
      );
    }
  };
  const handleDeleteSubtask = (key: string) => {
    const newValues = { ...formik.values };
    delete newValues[key];
    formik.setValues(newValues);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Text fontWeight={"bold"} fontSize={"18px"}>
            {title ? title : ""}
          </Text>
        </ModalHeader>
        <ModalBody gap="1.5rem" display={"flex"} flexDir={"column"} p="0">
          <Flex flexDir={"column"} gap="0.5rem">
            <Text color="mediun_Grey" fontWeight={"sm"}>
              Title
            </Text>
            <Input
              placeholder="e.g Take coffee break"
              name={"title"}
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </Flex>

          <Flex flexDir={"column"} gap="0.5rem">
            <Text color="mediun_Grey" fontWeight={"sm"}>
              Description
            </Text>
            <Textarea
              placeholder="e.g Take coffee break"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </Flex>
          <Flex flexDir={"column"} gap="11px">
            <Text color="mediun_Grey" fontWeight={"sm"}>
              Description
            </Text>
            {Object.keys(formik.values)?.map((key) => (
              <Flex
                gap="0.5rem"
                alignItems={"center"}
                display={key.includes("subtask") ? "flex" : "none"}
                key={key}
              >
                <Input
                  placeholder="e.g Take coffee break"
                  defaultValue={formik.values[key]}
                  onChange={formik.handleChange}
                  id={key}
                  name={key}
                />
                <Img
                  src={xIcon}
                  alt="remove"
                  cursor={"pointer"}
                  onClick={() => handleDeleteSubtask(key)}
                />
              </Flex>
            ))}
            <Button variant={"secondary"} onClick={handleNewSubtask}>
              +Add New Subtask
            </Button>
          </Flex>
          <Flex flexDir={"column"} gap="0.5rem">
            <Text color="mediun_Grey" fontWeight={"sm"}>
              Status
            </Text>
            <Select
              value={formik.values.status}
              name="status"
              onChange={formik.handleChange}
              cursor={"pointer"}
            >
              {currentBoard.columns?.map(
                (item: { name: string }, index: number) => (
                  <option key={item.name} value={Number(index)}>
                    {item.name}
                  </option>
                )
              )}
            </Select>
          </Flex>
        </ModalBody>

        <ModalFooter flexDir={"column"} alignItems={"start"} gap="0.5rem" p="0">
          <Button onClick={() => formik.handleSubmit()}>{buttonLabel}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewTaskModal;
