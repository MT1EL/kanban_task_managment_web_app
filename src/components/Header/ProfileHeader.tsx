import { Flex, Spinner, Text, Img, Avatar, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { User } from "firebase/auth";

function ProfileHeader({ user }: { user: User }) {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"}>
      <Flex gap="0.5rem">
        <Flex position={"relative"} zIndex={3} role="group">
          <Flex
            opacity={"0"}
            position={"absolute"}
            inset={"0 0 0 0"}
            zIndex={30}
            bg="rgba(0,0,0,0.5)"
            borderRadius={"full"}
            justifyContent={"center"}
            alignItems={"center"}
            _groupHover={{ opacity: "1" }}
            cursor={"pointer"}
            transition={"300ms ease"}
          >
            <AddIcon />
          </Flex>
          <Avatar
            size="md"
            name={user.displayName as string}
            src={user?.photoURL as string}
          />
        </Flex>

        <Flex flexDir="column">
          <Text>{user?.displayName}</Text>
          <Text color="medium_Grey">{user?.email}</Text>
        </Flex>
      </Flex>
      <Button variant="secondary" size="sm">
        Upload profile Image
      </Button>
    </Flex>
  );
}

export default ProfileHeader;
