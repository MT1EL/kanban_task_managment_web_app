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
function NewTaskModal({
  isOpen,
  onClose,
  title,
  buttonLabel,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonLabel: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="2rem" mx="1rem" gap="1.5rem" w="480px" maxW="100%">
        <ModalHeader p="0">
          <Text fontWeight={"bold"} fontSize={"18px"}>
            {title}
          </Text>
        </ModalHeader>
        <ModalBody gap="1.5rem" display={"flex"} flexDir={"column"} p="0">
          <Flex flexDir={"column"} gap="0.5rem">
            <Text color="mediun_Grey" fontWeight={"sm"}>
              Title
            </Text>
            <Input placeholder="e.g Take coffee break" />
          </Flex>

          <Flex flexDir={"column"} gap="0.5rem">
            <Text color="mediun_Grey" fontWeight={"sm"}>
              Description
            </Text>
            <Textarea placeholder="e.g Take coffee break" />
          </Flex>
          <Flex flexDir={"column"} gap="11px">
            <Text color="mediun_Grey" fontWeight={"sm"}>
              Description
            </Text>
            <Flex gap="0.5rem" alignItems={"center"}>
              <Input placeholder="e.g Take coffee break" />
              <Img src={xIcon} alt="remove" />
            </Flex>
            <Flex gap="0.5rem" alignItems={"center"}>
              <Input placeholder="e.g Take coffee break" />
              <Img src={xIcon} alt="remove" />
            </Flex>
            <Button>{buttonLabel}</Button>
          </Flex>
          <Flex flexDir={"column"} gap="0.5rem">
            <Text color="mediun_Grey" fontWeight={"sm"}>
              Status
            </Text>
            <Select placeholder={"Todo"} cursor={"pointer"}>
              <option value="to do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </Select>
          </Flex>
        </ModalBody>

        <ModalFooter flexDir={"column"} alignItems={"start"} gap="0.5rem" p="0">
          <Button>Create Task</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewTaskModal;
