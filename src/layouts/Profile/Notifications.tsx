import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
function Notifications({ user }: { user: User }) {
  const notifications = [
    {
      title: "New Board",
      description: "You have been added to a new board",
      time: "30min ago",
      seen: false,
      user: "John Doe",
    },
    {
      title: "New Board",
      description: "You have been added to a new board",
      time: "30min ago",
      seen: false,
      user: "John Doe",
    },
    {
      title: "New Board",
      description: "You have been added to a new board",
      time: "30min ago",
      seen: false,
      user: "John Doe",
    },
    {
      title: "New Board",
      description: "You have been added to a new board",
      time: "30min ago",
      seen: false,
      user: "John Doe",
    },
    {
      title: "New Board",
      description: "You have been added to a new board",
      time: "30min ago",
      seen: false,
      user: "John Doe",
    },
  ];

  return (
    <Flex
      flexDir={"column"}
      gap="1rem"
      border="1px solid"
      borderColor={"medium_Grey"}
      p="1.5rem"
      borderRadius={"10px"}
      w="100%"
    >
      <Text>Notifications</Text>
      {notifications.map((notification, index) => (
        <Flex
          border="1px solid"
          borderColor={"medium_Grey"}
          py="10px"
          px="20px"
          justifyContent={"space-between"}
          alignItems={"center"}
          w="100%"
        >
          <Flex gap="1rem">
            <Avatar name={notification.user} />
            <Box>
              <Text>{notification.title}</Text>
              <Text fontSize={"sm"} color="light_Grey">
                {notification.time}
              </Text>
            </Box>
          </Flex>
          <Flex gap="1rem" alignItems={"center"}>
            <Flex alignItems={"center"} gap="1rem">
              <CheckIcon
                w="20px"
                h="20px"
                _hover={{ color: "medium_Grey", cursor: "pointer" }}
              />

              <CloseIcon
                w="20px"
                _hover={{ color: "medium_Grey", cursor: "pointer" }}
              />
            </Flex>
            {notification.seen === false && (
              <Box
                w="10px"
                h="10px"
                borderRadius={"full"}
                bg={"medium_Grey"}
              ></Box>
            )}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

export default Notifications;
