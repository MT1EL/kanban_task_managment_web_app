import React from "react";
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
  console.log(columns);
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
                value={name}
                onChange={(e) => console.log(e.target.value)}
              />
              <Img src={xIcon} alt="remove" />
            </Flex>
          </Flex>
          <Flex flexDir={"column"} gap="11px">
            <Text color="mediun_Grey" fontWeight={"sm"}>
              Board Columns
            </Text>
            {columns?.map((subtask: { name: string }) => (
              <Flex gap="0.5rem" alignItems={"center"}>
                <Input
                  placeholder="e.g Take coffee break"
                  value={subtask.name}
                  onChange={(e) => console.log(e.target.value)}
                />
                <Img src={xIcon} alt="remove" />
              </Flex>
            ))}

            <Button variant={"secondary"}>+Add New Subtask</Button>
          </Flex>
        </ModalBody>

        <ModalFooter p="0" gap="1rem">
          <Button>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditBoard;
