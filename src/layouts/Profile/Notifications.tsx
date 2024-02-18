import { Avatar, Box, Flex, Text, useToast } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase";
function Notifications({ user }: { user: User }) {
  const toast = useToast();
  const [notifications, setNotifications] = useState<any[]>([]);
  const handleInvitationAccept = (notification: any) => {
    const ref = doc(database, "boards", notification.boardId);
    updateDoc(ref, {
      collaborators: [...notification.collaborators, user.uid],
    })
      .then(() => {
        handleInvitationReject(notification, false);
        toast({ title: "Invitation accepted", status: "success" });
      })
      .catch((error) =>
        toast({ title: "Error", description: error.message, status: "error" })
      );
  };
  const handleInvitationReject = (notification: any, showToast: boolean) => {
    const filteredNotifications = notifications.filter(
      (currentNotification) => currentNotification !== notification
    );
    const ref = doc(database, "users", user.uid);
    updateDoc(ref, {
      notifications: filteredNotifications,
    })
      .then(
        () =>
          showToast &&
          toast({ title: "Invitation rejected", status: "success" })
      )
      .catch((error) =>
        toast({ title: "Error", description: error.message, status: "error" })
      );
  };
  useEffect(() => {
    const ref = doc(database, "users", user.uid);
    const snapshot = onSnapshot(ref, (doc) => {
      setNotifications(doc.data()?.notifications);
    });
    return () => snapshot();
  }, []);

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
      {notifications.map((notification, index) => {
        console.log(notification);
        let timeAgo;
        const fetchedTime = notification.time.seconds * 1000;
        const currentTime = new Date().getTime();
        const difference = currentTime - fetchedTime;
        const minutesAgo = Math.floor(difference / (1000 * 60));
        const hoursAgo = Math.floor(difference / (1000 * 60 * 60));
        if (minutesAgo === 0) {
          timeAgo = "Just now";
        } else if (minutesAgo < 60) {
          timeAgo = minutesAgo + " minutes ago";
        } else if (hoursAgo < 24) {
          timeAgo = hoursAgo + " hours ago";
        } else {
          timeAgo = Math.floor(hoursAgo / 24) + " days ago";
        }
        return (
          <Flex
            border="1px solid"
            borderColor={"medium_Grey"}
            py="10px"
            px="20px"
            justifyContent={"space-between"}
            alignItems={"center"}
            w="100%"
            key={notification.boarId + notification.time.toString()}
          >
            <Flex gap="1rem">
              <Avatar name={notification.user.name} />
              <Box>
                <Text>{notification.title}</Text>
                <Text fontSize={"sm"} color="light_Grey">
                  {timeAgo}
                </Text>
              </Box>
            </Flex>
            <Flex gap="1rem" alignItems={"center"}>
              <Flex alignItems={"center"} gap="1rem">
                <CheckIcon
                  w="20px"
                  h="20px"
                  _hover={{ color: "medium_Grey", cursor: "pointer" }}
                  onClick={() => handleInvitationAccept(notification)}
                />

                <CloseIcon
                  w="20px"
                  _hover={{ color: "medium_Grey", cursor: "pointer" }}
                  onClick={() => handleInvitationReject(notification, true)}
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
        );
      })}
    </Flex>
  );
}

export default Notifications;
