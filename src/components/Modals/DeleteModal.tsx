import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Button,
} from "@chakra-ui/react";
function DeleteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
          <Text fontWeight={"bold"} fontSize={"18px"} color="red">
            Delete this board?
          </Text>
        </ModalHeader>
        <ModalBody gap="1.5rem" display={"flex"} flexDir={"column"} p="0">
          <Text fontSize={"13px"} lineHeight={"23px"} color="medium_Grey">
            Are you sure you want to delete the ‘Platform Launch’ board? This
            action will remove all columns and tasks and cannot be reversed.
          </Text>
        </ModalBody>

        <ModalFooter p="0" gap="1rem">
          <Button variant={"destructive"}>Delete</Button>
          <Button variant="secondary">Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteModal;
