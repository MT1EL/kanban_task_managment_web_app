import React from "react";
import {
  Img,
  PopoverTrigger,
  PopoverContent,
  Popover,
  PopoverBody,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Flex,
  Avatar,
  Grid,
  useToast,
} from "@chakra-ui/react";
import ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase";
import { BoardInterface } from "../../types";
import { CheckCircleIcon } from "@chakra-ui/icons";
function index({
  onClose,
  onDeleteClick,
  onEditClick,
  editTitle,
  deleteTitle,
  currentBoard,
}: {
  onClose: () => void;
  onDeleteClick: () => void;
  onEditClick: () => void;
  editTitle: string;
  deleteTitle: string;
  currentBoard: BoardInterface;
}) {
  const toast = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [collaborator, setCollaborator] = React.useState("");
  const { isOpen, onOpen, onClose: onCollaboratorModalClose } = useDisclosure();
  useEffect(() => {
    getDocs(collection(database, "users")).then((querySnapshot) => {
      const users: any[] = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists() && doc.data().id !== getAuth().currentUser?.uid) {
          users.push(doc.data());
        }
      });
      setUsers(users);
      setFilteredUsers(users);
    });
  }, []);

  useEffect(() => {
    const filterUser = filteredUsers.filter(
      (user) =>
        user?.email?.includes(collaborator) ||
        user?.name?.includes(collaborator)
    );
    setUsers(filterUser);
  }, [collaborator]);
  const handleCollaboratorAdd = (user: any) => {
    const authenticatedUser = getAuth().currentUser;
    const userRef = doc(database, "users", user.id);
    const notification = {
      type: "collaborator",
      boardId: currentBoard?.id,
      seen: false,
      collaborators: currentBoard.collaborators,
      time: new Date(),
      user: {
        name: authenticatedUser?.displayName,
        email: authenticatedUser?.email,
        id: authenticatedUser?.uid,
        avatar: authenticatedUser?.photoURL,
      },
      title: "New Board",
      description: `${authenticatedUser?.displayName} has invited you to a new board: ${currentBoard?.name}`,
    };
    const notificationBoardIds = user.notifications.map(
      (notification: any) => notification.boardId
    );
    if (notificationBoardIds?.includes(currentBoard.id)) {
      toast({
        title: "Invitation already sent",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else {
      updateDoc(userRef, {
        notifications: [...user.notifications, notification],
      })
        .then(() => {
          toast({
            title: "Invitation sent",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((err) => console.log(err));
    }
    const updatedUsers = filteredUsers.filter(
      (filUser) => filUser.id !== user.id
    );
    setFilteredUsers(updatedUsers);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Img src={ellipsis} alt="elipsis" cursor={"pointer"} />
      </PopoverTrigger>
      <PopoverContent
        maxW="192px"
        border="none"
        dropShadow={"0px 10px 20px 0px rgba(54, 78, 126, 0.25)"}
      >
        <PopoverBody p="1rem" gap="1rem" display={"flex"} flexDir={"column"}>
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
            {editTitle}
          </Text>
          <Text
            color="mediun_Grey"
            cursor={"pointer"}
            fontWeight={"medium"}
            fontSize="13px"
            onClick={onOpen}
          >
            Add collaborator
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
            {deleteTitle}
          </Text>
        </PopoverBody>
      </PopoverContent>
      <Drawer
        placement={"bottom"}
        onClose={onCollaboratorModalClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent h={"50vh"}>
          <DrawerHeader borderBottomWidth="1px">
            Add collaborators to your board
          </DrawerHeader>
          <DrawerBody>
            <Input
              placeholder={"Search for collaborator..."}
              onChange={(e) => setCollaborator(e.target.value)}
            />
            <Grid
              gridTemplateColumns={[
                "1fr",
                "minmax(300px, 1fr) minmax(300px, 1fr) minmax(300px, 1fr)",
                "1fr 1fr 1fr 1fr",
              ]}
              py="1rem"
              gap="1rem"
            >
              {users.length > 0 ? (
                users.map((user) => {
                  return (
                    <Flex
                      key={user.id}
                      w="100%"
                      p="1rem"
                      _hover={{ opacity: "0.6", cursor: "pointer" }}
                      onClick={() => handleCollaboratorAdd(user)}
                      border="1px solid"
                      borderColor="light_Grey"
                      borderRadius={"1rem"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Flex gap="0.5rem">
                        {user.avatar ? (
                          <Img
                            src={user.avatar}
                            alt="avatar"
                            borderRadius="50%"
                            w="40px"
                            h="40px"
                          />
                        ) : (
                          <Avatar name={user.name} />
                        )}
                        <Flex flexDir={"column"}>
                          <Text color="white">
                            {user.name ? user.name : "YOUR USERNAME"}
                          </Text>
                          <Text color="white">{user.email}</Text>
                        </Flex>
                      </Flex>
                      {currentBoard?.collaborators?.includes(user.id) && (
                        <CheckCircleIcon color="green.300" w="30px" h="30px" />
                      )}
                    </Flex>
                  );
                })
              ) : (
                <Text>Unfortunatly, you are only user on app</Text>
              )}
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Popover>
  );
}

export default index;
