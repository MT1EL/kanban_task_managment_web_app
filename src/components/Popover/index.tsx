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
  const handleCollaboratorAdd = (id: string) => {
    updateDoc(doc(database, "boards", currentBoard?.id), {
      collaborators: [...currentBoard?.collaborators, id],
    })
      .then(() => {
        toast({
          title: "Collaborator added",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({ title: "ERROR", description: error.message, status: "error" });
      });
    const updatedUsers = filteredUsers.filter((user) => user.id !== id);
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
              gridTemplateColumns={["1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
            >
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  return (
                    <Flex
                      key={user.id}
                      w="100%"
                      p="1rem"
                      gap="0.5rem"
                      _hover={{ opacity: "0.6", cursor: "pointer" }}
                      onClick={() => handleCollaboratorAdd(user.id)}
                    >
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
                      <Text color="white">
                        {user.name ? user.name : user.email}
                      </Text>
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
