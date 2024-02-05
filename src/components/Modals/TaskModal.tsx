import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  Checkbox,
  Select,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { TaskModalInterface } from "../../types";
import Popover from "../Popover/";
function TaskModal({
  isOpen,
  onClose,
  title,
  description,
  subtasks,
  status,
  onEditClick,
  onDeleteClick,
}: TaskModalInterface) {
  console.log(subtasks);
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
          <Flex
            gap="1.5rem"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontWeight={"bold"} fontSize={"18px"}>
              {title}
            </Text>
            <Popover
              onEditClick={onEditClick}
              onClose={onClose}
              onDeleteClick={onDeleteClick}
            />
          </Flex>
        </ModalHeader>
        <ModalBody gap="1.5rem" display={"flex"} flexDir={"column"} p="0">
          <Box>
            <Text
              fontSize={"13px"}
              lineHeight={"23px"}
              color="medium_Grey"
              fontWeight={"medium"}
            >
              {description}
            </Text>
          </Box>
          <Flex flexDir={"column"} gap="1rem">
            <Text fontSize={"sm"} color="medium_Grey" fontWeight={"bold"}>
              Subtasks (0 of {subtasks?.length})
            </Text>
            <VStack gap="0.5rem" alignItems={"start"}>
              {subtasks?.map((subTask) => (
                <Checkbox
                  key={subTask.description}
                  defaultChecked={subTask.isCompleted}
                >
                  {subTask.description}
                </Checkbox>
              ))}
            </VStack>
          </Flex>
        </ModalBody>

        <ModalFooter flexDir={"column"} alignItems={"start"} gap="0.5rem" p="0">
          <Text color="medium_Grey" fontSize={"sm"} fontWeight={"bold"}>
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
