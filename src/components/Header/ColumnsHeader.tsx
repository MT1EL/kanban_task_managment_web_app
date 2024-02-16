import { HStack, Box, Text } from "@chakra-ui/react";
import ColorsPopover from "../Popover/ColorsPopover";
import { columnType } from "../../types";
function ColumnsHeader({
  column,
  boardId,
  columns,
}: {
  column: columnType;
  boardId: string;
  columns: columnType[];
}) {
  return (
    <HStack gap="0.75rem" alignItems={"center"}>
      <ColorsPopover
        dotColor={column.dotColor ?? ""}
        boardId={boardId}
        columns={columns}
        currentColumn={column}
      />
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
