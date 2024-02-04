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
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { addTable } from "../../firebaseFunctions/table";
interface InitialValues {
  [key: string]: any;
}

function EditBoard({
  isOpen,
  onClose,
  columns,
  name,
}: {
  isOpen: boolean;
  onClose: () => void;
  columns: any;
  name: string;
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const formik = useFormik({
    initialValues: {
      "Board Name": "",
    },
    onSubmit: (values) => {
      let newColumnsArr: any = [];
      let boardObject = { name: values["Board Name"], columns: newColumnsArr };
      Object.keys(values).map((key: string) => {
        if (key !== "Board Name") {
          newColumnsArr.push({ name: values[key], tasks: [] });
        }
      });
      addTable(boardObject);
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
    console.log(formik_values_keys.length);
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
          <Button onClick={formik.handleSubmit}>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditBoard;

// const handleNewColumn = () => {
//   setMyColumns([...myColumns, { name: "", tasks: [] }]);
//   const newInitialValueName = `col${Object.keys(formik.values).length - 1}`;
//   formik.setFieldValue(
//     newInitialValueName,
//     formik.values[newInitialValueName]
//       ? formik.values[newInitialValueName]
//       : ""
//   );
// };
// const handleColumnDelete = (columnIndex: number) => {
//   const newValues = { ...formik.values };
//   const formik_values_keys_arr = Object.keys(formik.values);
//   const lengt_of_formik_values_keys_array = formik_values_keys_arr.length;
//   const to_remove_item_name = Object.keys(formik.values)[
//     lengt_of_formik_values_keys_array
//   ];
//   delete newValues[to_remove_item_name];
//   formik.setValues(newValues);
//   const newColumns = myColumns.filter(
//     (_: any, index: number) => columnIndex !== index
//   );
//   setMyColumns(newColumns);
// };
// const handleColumnDelete = (colToDelete: string) => {
//   const newColumns = myColumns.filter(
//     (_: any, index: number) => columnIndex !== index
//   );
//   setMyColumns(newColumns);

//   const newValues = { ...formik.values };
//   const columnToRemove = Object.keys(newValues)[columnIndex]; // Get the key corresponding to the column index
//   if (columnToRemove) {
//     delete newValues[columnToRemove]; // Remove the column from formik values
//     formik.setValues(newValues); // Update formik values
//   }
// };
