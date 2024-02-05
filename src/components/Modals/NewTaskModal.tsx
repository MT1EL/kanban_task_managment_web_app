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
import {
  NewTaskModalInterface,
  columnType,
  subtaskType,
  taskType,
} from "../../types";
interface InitialValuesInterface {
  [key: string]: string;
  title: string;
  description: string;
  status: string;
}
interface taskObjectInterface {
  [x: string]: any;
  title: string;
  description: string;
  status: string;
}
function NewTaskModal({
  isOpen,
  onClose,
  title,
  buttonLabel,
  taskTitle,
  description,
  subtasks,
  status,
  columns,
  board_id,
  selectedTask,
  setCurrentBoard,
  board_name,
}: NewTaskModalInterface) {
  const getInitialValues = () => {
    let objToRerutn: { [x: string]: any } = {};
    if (subtasks) {
      subtasks.map((subtask: subtaskType, index: number) => {
        objToRerutn[`subtask${index}`] = subtask.description;
      });
    } else {
      objToRerutn.subtask0 = "";
      objToRerutn.subtask1 = "";
    }
    return objToRerutn;
  };
  const initialValuesObject: InitialValuesInterface = {
    title: taskTitle ? taskTitle : "",
    description: description ? description : "",
    status: status ? status : columns[0].name,
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
      let newColumns: columnType[] = [...columns];
      newColumns?.map((column) => {
        if (column.name === taskObj.status) {
          if (
            column.tasks.some(
              (item) => JSON.stringify(item) === JSON.stringify(selectedTask)
            )
          ) {
            const taskIndex = column.tasks.indexOf(selectedTask);
            column.tasks[taskIndex] = taskObj;
          } else {
            column.tasks = [taskObj, ...column.tasks];
          }
        }
        if (selectedTask && selectedTask.status !== taskObj.status) {
          if (column.name === selectedTask.status) {
            // console.log(column.tasks[0] === selectedTask);
            if (column.tasks.length === 1) {
              column.tasks = [];
            } else {
              const indexToRemove = column.tasks.indexOf(selectedTask);
              column.tasks.splice(indexToRemove, 1);
            }
          }
        }
      });
      const updateBoard = {
        id: board_id,
        name: board_name,
        columns: newColumns,
      };
      if (setCurrentBoard) {
        setCurrentBoard(updateBoard);
      }
      updateColumn(board_id, newColumns as any);
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
            {Object.keys(formik.values)?.map((key, index) => (
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
              defaultValue={formik.values.status}
              name="status"
              onChange={formik.handleChange}
              cursor={"pointer"}
            >
              {columns.map((item: { name: string }) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
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
