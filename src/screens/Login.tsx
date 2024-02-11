import { Button, Flex, Input } from "@chakra-ui/react";

function Login() {
  return (
    <Flex
      p="1.5rem"
      mt="90px"
      bg="dark_Grey"
      w="fit-content"
      borderRadius={"1rem"}
      mx="auto"
    >
      <Flex flexDir={"column"} gap="1rem" minW="300px">
        <Input placeholder="email" />
        <Input placeholder="password" />
        <Button variant={"primary"}>Log in</Button>
      </Flex>
    </Flex>
  );
}

export default Login;
