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
  Img,
  PopoverTrigger,
  PopoverContent,
  Popover,
  PopoverBody,
} from "@chakra-ui/react";
import ellipsis from "../../assets/icon-vertical-ellipsis.svg";
function TaskModal({
  isOpen,
  onClose,
  title,
  description,
  subtasks,
  status,
  onEditClick,
  onDeleteClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  subtasks: { title: string; isCompleted: boolean }[];
  status: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
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
          <Flex
            gap="1.5rem"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontWeight={"bold"} fontSize={"18px"}>
              {title}
            </Text>
            <Popover>
              <PopoverTrigger>
                <Img src={ellipsis} alt="elipsis" cursor={"pointer"} />
              </PopoverTrigger>
              <PopoverContent
                maxW="192px"
                border="none"
                dropShadow={"0px 10px 20px 0px rgba(54, 78, 126, 0.25)"}
              >
                <PopoverBody
                  p="1rem"
                  gap="1rem"
                  display={"flex"}
                  flexDir={"column"}
                >
                  <Text
                    color="mediun_Grey"
                    fontWeight={"medium"}
                    fontSize="13px"
                    cursor={"pointer"}
                    onClick={() => {
                      onClose();
                      onEditClick();
                    }}
                  >
                    Edit Task
                  </Text>
                  <Text
                    color="red"
                    cursor={"pointer"}
                    fontWeight={"medium"}
                    fontSize="13px"
                    onClick={() => {
                      onClose();
                      onDeleteClick();
                    }}
                  >
                    Delete Task
                  </Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>
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
                  key={subTask.title}
                  defaultChecked={subTask.isCompleted}
                >
                  {subTask.title}
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
