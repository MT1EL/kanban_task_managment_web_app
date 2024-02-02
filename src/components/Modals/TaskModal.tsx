import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  Checkbox,
  Select,
} from "@chakra-ui/react";
function TaskModal({
  isOpen,
  onClose,
  title,
  description,
  subtasks,
  status,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  subtasks: { title: string; isCompleted: boolean }[];
  status: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody gap="1.5rem">
          <Text>{description}</Text>
          <Box>
            <Text>Subtasks (0 of {subtasks.length})</Text>
            {subtasks.map((subTask) => (
              <Checkbox checked={subTask.isCompleted}>{subTask.title}</Checkbox>
            ))}
          </Box>
        </ModalBody>

        <ModalFooter flexDir={"column"} alignItems={"start"}>
          <Text color="medium_Grey" fontSize={"sm"}>
            Current Status
          </Text>
          <Select placeholder={status} cursor={"pointer"}>
            <option value="to do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </Select>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TaskModal;
