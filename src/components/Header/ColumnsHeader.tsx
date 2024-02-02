import React from "react";
import { HStack, Box, Text } from "@chakra-ui/react";
function ColumnsHeader({
  name,
  taskLength,
}: {
  name: string;
  taskLength: number;
}) {
  return (
    <HStack gap="0.75rem" alignItems={"center"}>
      <Box
        w="15px"
        h="15px"
        bg={
          name === "Todo" ? "#49C4E5" : name === "Doing" ? "#8471F2" : "#67E2AE"
        }
        borderRadius={"15px"}
      />
      <Text
        fontSize={"sm"}
        fontWeight={"bold"}
        color="medium_Grey"
        letterSpacing={"wide"}
      >
        {name.toUpperCase()} ({taskLength})
      </Text>
    </HStack>
  );
}

export default ColumnsHeader;
