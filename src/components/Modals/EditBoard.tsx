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
import { FormikProps, useFormik } from "formik";
import { BoardInterface, columnType } from "../../types";
import editBoardSubmit from "../../formik/onSubmit/editboard";
import { useColumnDelete } from "../../hooks/useColumnDelete";
import { useColumnAdd } from "../../hooks/useColumnAdd";
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
      formik.setFieldValue("Board Name", currentBoard ? currentBoard.name : "");
      currentBoard.columns?.map((item: columnType, index: number) => {
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
  interface FormValues {
    [key: string]: string;
  }
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: initialValuesObject,
    onSubmit: (values) =>
      editBoardSubmit(values, setIsDisabled, currentBoard, onClose, formik),
  });
  useEffect(() => {
    getInitialValues();
  }, [isOpen, currentBoard]);

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
            {Object.keys(formik.values)?.map((key) => (
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
                  onClick={() => useColumnDelete(key, setIsDisabled, formik)}
                  cursor={"pointer"}
                />
              </Flex>
            ))}

            <Button
              variant={"secondary"}
              onClick={() => useColumnAdd(formik, setIsDisabled)}
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
