import { User } from "firebase/auth";
import { Avatar, Box, Card, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../../firebase";
import { BoardInterface } from "../../types";
function Boards({ user }: { user: User }) {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const boardDescriptionTitles = ["name", "columns", "collaborators", "owner"];
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(database, "boards"),
        where(
          "collaborators",
          "array-contains",
          user.uid || "ownerId" === user.uid
        )
      ),
      (snapshot) => {
        const boards: BoardInterface[] = [];
        snapshot.forEach((doc) => {
          boards.push({ ...doc.data(), id: doc.id } as BoardInterface);
        });
        setBoards(boards as any);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <Flex
      borderRadius={"10px"}
      p="1.5rem"
      border="1px solid rgba(130, 143, 163, 0.25)"
      gap="2rem"
      flexWrap={"wrap"}
      w="fit-content"
    >
      {boards.length > 0 ? (
        boards?.map((board: BoardInterface) => (
          <Card
            key={board.id}
            p="1rem"
            borderRadius={"10px"}
            border="1px solid rgba(130, 143, 163, 0.25)"
            minW="200px"
            gap="1rem"
            w="100%"
          >
            <Flex gap="0.5rem">
              {board.createdBy.photoURL ? (
                <Avatar src={board.createdBy.photoURL} w="50px" h="50px" />
              ) : (
                <Avatar name={board.createdBy.name} />
              )}
              <Box>
                <Text>{board.createdBy.name}</Text>
                <Text>{board.createdBy.email}</Text>
              </Box>
            </Flex>
            <Grid
              gridTemplateColumns={"1fr 1fr 1fr 1fr"}
              borderBottom={"1px solid"}
              borderColor={"medium_Grey"}
              borderRadius={"10px"}
            >
              {boardDescriptionTitles.map((title, index) => (
                <Box
                  key={title}
                  border="1px solid"
                  borderColor={"medium_Grey"}
                  borderRadius={
                    boardDescriptionTitles.length === index + 1
                      ? "0 10px 0 0"
                      : index === 0
                      ? "10px 0 0 0"
                      : "0"
                  }
                  w="100%"
                  px="0.5rem"
                >
                  <Text>{title}</Text>
                </Box>
              ))}
              <Box
                borderBottomLeftRadius={"10px"}
                borderInline={"1px solid"}
                borderColor={"medium_Grey"}
              >
                <Text p="0.5rem">{board.name}</Text>
              </Box>
              <Box py="0.5rem">
                {board.columns.map((column, index) => (
                  <Flex
                    key={column.name + column.dotColor + index}
                    px=".5rem"
                    alignItems={"center"}
                    gap="0.5rem"
                  >
                    <Box
                      h="12px"
                      w="12px"
                      borderRadius={"full"}
                      bg={column.dotColor}
                    />
                    <Text>{column.name}</Text>
                  </Flex>
                ))}
              </Box>
              <Box
                p="0.5rem"
                borderInline={"1px solid"}
                borderColor={"medium_Grey"}
              >
                {board.collaboratorsData.map((collaborator, index) => (
                  <Box key={collaborator.ownerId + index} px=".5rem">
                    <Text>{collaborator.name}</Text>
                  </Box>
                ))}
              </Box>
              <Box
                borderBottomRightRadius={"10px"}
                borderInline={"1px solid"}
                borderColor={"medium_Grey"}
              >
                <Text p="0.5rem">
                  {board.createdBy.name ?? board.createdBy.email}
                </Text>
              </Box>
            </Grid>
          </Card>
        ))
      ) : (
        <Text>Your boards is empty</Text>
      )}
    </Flex>
  );
}

export default Boards;
