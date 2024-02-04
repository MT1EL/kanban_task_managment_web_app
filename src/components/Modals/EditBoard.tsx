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
import { useState } from "react";
import { useFormik } from "formik";
import { addBoard, updateBoard } from "../../firebaseFunctions/table";
import { BoardInterface } from "../../types";
interface InitialValuesInterface {
  [key: string]: string;
}

function EditBoard({
  isOpen,
  onClose,
  columns,
  name,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  columns?: any;
  name?: string;
  id?: string;
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const getInitialValues = () => {
    let objToRerutn: InitialValuesInterface = {};
    if (columns) {
      columns.map((item: any, index: number) => {
        objToRerutn[`col${index}`] = item.name;
      });
    } else {
      objToRerutn.col0 = "";
      objToRerutn.col1 = "";
    }
    return objToRerutn;
  };
  const initialValuesObject: InitialValuesInterface = {
    "Board Name": name ? name : "",
    // Add other fields as needed
    ...getInitialValues(),
  };
  const formik = useFormik({
    initialValues: initialValuesObject,
    onSubmit: (values) => {
      let newColumnsArr: any = [];
      let boardObject = { name: values["Board Name"], columns: newColumnsArr };
      Object.keys(values)?.map((key: string) => {
        if (key !== "Board Name") {
          newColumnsArr.push({ name: values[key], tasks: [] });
        }
      });
      if (name) {
        updateBoard(boardObject as BoardInterface, id);
      } else {
        addBoard(boardObject);
      }
      onClose();
    },
  });
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
