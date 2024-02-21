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
import { useEffect } from "react";
import { newtaskModalOnSubmit } from "../../formik/onSubmit/newtaskmodal";
import {
  handleDeleteSubtask,
  handleNewSubtask,
} from "../../formik/functions/task";

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
  const getDefaultInitialValues = () => {
    let initialValuesObject: any = {
      title: selectedTask?.title ? selectedTask.title : "",
      description: selectedTask?.description ? selectedTask?.description : "",
      status: selectedTask?.status ? selectedTask?.status : 0,
      ...getInitialValues(),
    };
    formik.setValues(initialValuesObject);
    return initialValuesObject;
  };

  useEffect(() => {
    getDefaultInitialValues();
  }, [isOpen]);
  const formik = useFormik({
    initialValues: { ...getInitialValues() },
    onSubmit: (values) => {
      newtaskModalOnSubmit(values, currentBoard, selectedTask, formik);
      onClose();
    },
  });

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
              Subtasks
            </Text>
            <Flex
              flexDir={"column"}
              gap={"11px"}
              maxH="91px"
              overflowY={"scroll"}
              css={{
                "&::-webkit-scrollbar": {
                  width: Object.keys(formik.values).length > 5 ? "4px" : "0px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "white",
                  borderRadius: "24px",
                },
              }}
              pr={Object.keys(formik.values).length > 5 ? "8px" : "0px"}
            >
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
                    onClick={() => handleDeleteSubtask(key, formik)}
                  />
                </Flex>
              ))}
            </Flex>
            <Button
              variant={"secondary"}
              onClick={() => handleNewSubtask(formik)}
            >
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
              {currentBoard?.columns?.map(
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
