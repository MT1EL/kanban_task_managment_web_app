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
import { getAuth } from "firebase/auth";
interface InitialValuesInterface {
  [key: string]: string;
}

function EditBoard({
  isOpen,
  onClose,
  currentBoard,
  setCurrentBoard,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentBoard?: BoardInterface;
  setCurrentBoard?: Dispatch<BoardInterface>;
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const getRandomColor = (alreadyUsedColors: string[]) => {
    const colors = ["#635FC7", "#FFFFFF", "#EA5555", "#49C4E5", "#67E2AE"];
    const filteredColors = colors.filter(
      (color) => alreadyUsedColors.includes(color) === false
    );
    const colorIndex = Math.floor(Math.random() * (filteredColors.length - 1));
    return filteredColors[colorIndex];
  };
  const getInitialValues = () => {
    if (currentBoard) {
      formik.setValues({});
      formik.setFieldValue("Board Name", currentBoard ? currentBoard.name : "");
      currentBoard.columns?.map((item: any, index: number) => {
        formik.setFieldValue(`col${index}`, item.name);
      });
    } else {
      formik.setFieldValue(`col0`, "");
      formik.setFieldValue(`col1`, "");
    }
  };
  const initialValuesObject: InitialValuesInterface = {
    "Board Name": currentBoard ? currentBoard?.name : "",
    // Add other fields as needed
  };
  const formik = useFormik({
    initialValues: initialValuesObject,
    onSubmit: (values) => {
      if (Object.keys(values).length === 6) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
      // check if the board is new or existing
      // if new, get columns from formik.values where key is not "Board Name"
      // if existing, get columns from currentBoard
      // then call addBoard or updateBoard
      const columnNames = currentBoard?.columns?.map((column) => column.name);
      const dotColors = currentBoard?.columns?.map((column) => column.dotColor);
      const columns: any[] = [];
      const colors: string[] = dotColors ? dotColors : [];
      for (const key in values) {
        if (key !== "Board Name") {
          let index = columnNames?.indexOf(values[key]);
          if (currentBoard && index !== -1) {
            const column = {
              name: values[key],
              tasks: currentBoard?.columns[index].tasks,
              dotColor: currentBoard?.columns[index].dotColor,
            };
            columns.push(column);
          } else {
            const dotColor = getRandomColor(colors);
            columns.push({
              name: values[key],
              tasks: [],
              dotColor: dotColor,
            });
            colors.push(dotColor);
          }
        }
      }
      if (currentBoard) {
        updateBoard(
          {
            name: values["Board Name"],
            columns: columns as columnType[],
            id: currentBoard.id,
            createdBy: currentBoard.createdBy,
            collaborators: currentBoard.collaborators,
          },
          currentBoard.id
        );
      } else {
        const user = getAuth().currentUser;
        addBoard({
          name: values["Board Name"],
          createdBy: user?.uid,
          collaborators: [user?.uid],
          columns: columns as columnType[],
        });
      }
      onClose();
      formik.resetForm();
    },
  });
  useEffect(() => {
    getInitialValues();
  }, [isOpen, currentBoard]);
  const handleNewColumn = () => {
    const formik_values_keys = Object.keys(formik.values);
    if (formik_values_keys.length === 5) {
      setIsDisabled(true);
    }
    if (formik_values_keys.length > 0 && formik_values_keys.length < 6) {
      const newInitialValueName = `col${Object.keys(formik.values).length - 1}`;
      formik.setFieldValue(
        newInitialValueName,
        formik.values[newInitialValueName]
          ? formik.values[newInitialValueName]
          : ""
      );
    }
  };
  const handleColumnDelete = (key: string) => {
    const newValues = { ...formik.values };
    delete newValues[key];
    formik.setValues(newValues);
    const formik_values_keys = Object.keys(formik.values);
    if (formik_values_keys.length <= 6) {
      setIsDisabled(false);
    }
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
                  cursor={"pointer"}
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
