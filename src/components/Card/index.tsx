import { Card, Text, useColorMode } from "@chakra-ui/react";

function index({
  title,
  subTasks_title,
  handleClick,
}: {
  title: string;
  subTasks_title: string;
  handleClick: () => void;
}) {
  const { colorMode } = useColorMode();
  return (
    <Card
      w="100%"
      bg={colorMode === "dark" ? "dark_Grey" : "white"}
      py="1.4375rem"
      px="1rem"
      boxShadow={"0px 4px 6px 0px rgba(54, 78, 126, 0.1015)"}
      borderRadius={"0.5rem"}
      onClick={handleClick}
      cursor={"pointer"}
    >
      <Text fontWeight={"bold"} fontSize={"md"}>
        {title}
      </Text>
      <Text color="medium_Grey" fontSize={"sm"}>
        {subTasks_title}
      </Text>
    </Card>
  );
}

export default index;
