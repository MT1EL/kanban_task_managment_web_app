import { HStack, Box, Text } from "@chakra-ui/react";
function ColumnsHeader({
  column,
}: {
  column: { dotColor?: string; name: string; tasks: any[] };
}) {
  return (
    <HStack gap="0.75rem" alignItems={"center"}>
      <Box w="15px" h="15px" bg={column.dotColor} borderRadius={"15px"} />
      <Text
        fontSize={"sm"}
        fontWeight={"bold"}
        color="medium_Grey"
        letterSpacing={"wide"}
      >
        {column.name.toUpperCase()} ({column.tasks.length})
      </Text>
    </HStack>
  );
}

export default ColumnsHeader;
