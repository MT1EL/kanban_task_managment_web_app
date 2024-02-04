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
  useDisclosure,
} from "@chakra-ui/react";
import xIcon from "../../assets/icon-cross.svg";
import { useFormik } from "formik";
import { updateColumn } from "../../firebaseFunctions/table";
import { NewTaskModalInterface, columnType } from "../../types";
import { ReactElement, JSXElementConstructor, ReactNode, Key } from "react";
import DeleteModal from "./DeleteModal";
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
}: NewTaskModalInterface) {
  const initialValuesObject: InitialValuesInterface = {
    title: taskTitle ? taskTitle : "",
    description: description ? description : "",
    status: status ? status : columns[0].name,
  };
  const formik = useFormik({
    initialValues: initialValuesObject,
    onSubmit: (values) => {
      let taskObj: taskObjectInterface = { ...values };
      console.log(taskObj);
      let subtaskArr: { title: any; isCompleted: boolean }[] = [];
      const taskObj_keys = Object.keys(taskObj);
      taskObj_keys?.map((key) => {
        if (key.includes("subtask")) {
          subtaskArr.push({ title: values[key], isCompleted: false });
          delete taskObj[key];
        }
      });
      taskObj.subtasks = subtaskArr;
      let newColumns: columnType[] = [...columns];
      newColumns?.map((column) => {
        if (column.name === values.status) {
          column.tasks = [...column.tasks, taskObj] as any;
        }
      });
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
