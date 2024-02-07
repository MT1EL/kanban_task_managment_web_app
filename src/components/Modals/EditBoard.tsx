import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  Flex,
  Input,
  Img,
} from "@chakra-ui/react";
import xIcon from "../../assets/icon-cross.svg";
import { Dispatch, useEffect, useState } from "react";
import { useFormik } from "formik";
import { addBoard, updateBoard } from "../../firebaseFunctions/table";
import { BoardInterface, columnType } from "../../types";
interface InitialValuesInterface {
  [key: string]: string;
}

function EditBoard({
  isOpen,
  onClose,
  currentBoard,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentBoard?: BoardInterface;
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const getInitialValues = () => {
    if (currentBoard) {
      formik.setValues({});
      formik.setFieldValue("Board Name", currentBoard.name);
      currentBoard.columns.map((item: any, index: number) => {
        formik.setFieldValue(`col${index}`, item.name);
      });
    } else {
      formik.setFieldValue(`col0`, "");
      formik.setFieldValue(`col1`, "");
    }
  };
  const initialValuesObject: InitialValuesInterface = {
    "Board Name": currentBoard?.name ? currentBoard?.name : "",
    // Add other fields as needed
  };
  const formik = useFormik({
    initialValues: initialValuesObject,
    onSubmit: (values) => {
      const newColumns: columnType[] = currentBoard
        ? [...currentBoard?.columns]
        : [];
      const formik_keys_arr = Object.keys(values);
      const formik_values_arr = Object.values(values);
      const formik_columns = formik_keys_arr.splice(1);
      const formik_columns_values = formik_values_arr.splice(1);
      const task_value_changed = newColumns.length === formik_columns.length;
      const task_deleted = newColumns.length > formik_columns.length;

      if (task_value_changed) {
        formik_columns.map((key: string, index) => {
          newColumns[index].name = values[key];
        });
      } else if (task_deleted) {
        newColumns.map((column: columnType, index) => {
          if (!formik_columns_values.includes(column.name)) {
            newColumns.splice(index, 1);
          }
        });
      } else {
        formik_columns.map((key, index) => {
          if (values[key] !== newColumns[index]?.name) {
            console.log("new col name is equal to old columns name");
            newColumns.push({ name: values[key], tasks: [] });
          }
        });
      }

      if (currentBoard) {
        const newCurrentBoard = {
          ...currentBoard,
          name: values["Board Name"],
          columns: newColumns,
        };
        updateBoard(newCurrentBoard, currentBoard?.id);
      } else {
        const newBoard = { name: values["Board Name"], columns: newColumns };
        addBoard(newBoard);
      }
      onClose();
    },
  });
  useEffect(() => {
    getInitialValues();
  }, [currentBoard]);
  const handleNewColumn = () => {
    const formik_values_keys = Object.keys(formik.values);
    if (formik_values_keys.length > 0 && formik_values_keys.length < 5) {
      const newInitialValueName = `col${Object.keys(formik.values).length - 1}`;
      formik.setFieldValue(
        newInitialValueName,
        formik.values[newInitialValueName]
          ? formik.values[newInitialValueName]
          : ""
      );
    } else if (formik_values_keys.length === 6) {
      setIsDisabled(true);
    }
  };
  const handleColumnDelete = (key: string) => {
    const formik_values_keys = Object.keys(formik.values);
    if (formik_values_keys.length < 7) {
      setIsDisabled(false);
    }
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
            Edit Board
          </Text>
        </ModalHeader>
        <ModalBody gap="1.5rem" display={"flex"} flexDir={"column"} p="0">
          <Flex flexDir={"column"} gap="11px">
            <Text color="mediun_Grey" fontWeight={"sm"}>
              Board Name
            </Text>
            <Flex gap="0.5rem" alignItems={"center"}>
              <Input
                placeholder="e.g Take coffee break"
                value={formik.values["Board Name"]}
                name={"Board Name"}
                id={"Board Name"}
                onChange={formik.handleChange}
              />
              <Img src={xIcon} alt="remove" />
            </Flex>
          </Flex>
          <Flex flexDir={"column"} gap="11px">
            <Text color="mediun_Grey" fontWeight={"sm"}>
              Board Columns
            </Text>
            {Object.keys(formik.values)?.map((key, index: number) => (
              <Flex
                gap="0.5rem"
                alignItems={"center"}
                key={key}
                display={key === "Board Name" ? "none" : "flex"}
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
                  onClick={() => handleColumnDelete(key)}
                />
              </Flex>
            ))}

            <Button
              variant={"secondary"}
              onClick={handleNewColumn}
              isDisabled={isDisabled}
            >
              +Add New Column
            </Button>
          </Flex>
        </ModalBody>

        <ModalFooter p="0" gap="1rem">
          <Button onClick={() => formik.handleSubmit()}>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditBoard;
