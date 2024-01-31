import { Text, Box, Flex } from "@chakra-ui/react";
import MyDrawer from "../components/Drawer/MyDrawer";

function Home() {
  return (
    <Flex gap="1rem" w="100%" h="calc(100% - 90px)">
      <MyDrawer />
      <Text>test</Text>
    </Flex>
  );
}

export default Home;
