import React from "react";
import {
  Img,
  PopoverTrigger,
  PopoverContent,
  Popover,
  PopoverBody,
  Text,
} from "@chakra-ui/react";
import ellipsis from "../../assets/icon-vertical-ellipsis.svg";

function index({
  onClose,
  onDeleteClick,
}: {
  onClose: () => void;
  onDeleteClick: () => void;
}) {
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
            Edit Task
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
            Delete Task
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default index;
