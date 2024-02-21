import React from "react";
import { SketchPicker } from "react-color";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
  PopoverBody,
  Box,
  Button,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase";
import { columnType } from "../../types";
function ColorsPopover({
  dotColor,
  boardId,
  columns,
  currentColumn,
}: {
  dotColor: string;
  boardId: string;
  columns: columnType[];
  currentColumn: columnType;
}) {
  const [selectedColor, setSelectedColor] = React.useState(dotColor);
  const handleColorChange = (color: any) => {
    setSelectedColor(color.hex);
  };
  const handleClose = () => {
    const duplicatedColumns = [...columns];
    const currentColumnIndex = duplicatedColumns.findIndex(
      (column) => column.name === currentColumn.name
    );
    if (currentColumnIndex === -1) return;
    duplicatedColumns[currentColumnIndex].dotColor = selectedColor;

    updateDoc(doc(database, "boards", boardId), {
      columns: duplicatedColumns,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Popover placement="bottom-start" onClose={handleClose}>
      <PopoverTrigger>
        <Box w="15px" h="15px" bg={selectedColor} borderRadius={"15px"} />
      </PopoverTrigger>
      <PopoverContent
        w="fit-content"
        border="none"
        dropShadow={"0px 10px 20px 0px rgba(54, 78, 126, 0.25)"}
      >
        <PopoverBody p="1rem" gap="1rem" display={"flex"} flexDir={"column"}>
          <SketchPicker color={selectedColor} onChange={handleColorChange} />
          <Button
            variant={"secondary"}
            onClick={() => setSelectedColor(dotColor)}
          >
            Reset Color
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default ColorsPopover;
