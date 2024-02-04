import { useColorMode, Box, useDisclosure } from "@chakra-ui/react";
import ShowDrawer from "./ShowDrawer";
import DrawerFooter from "./DrawerFooter";
import { useState } from "react";
import DrawerBody from "./DrawerBody";
import EditBoard from "../Modals/EditBoard";
function MyDrawer({ setColumns, currentBoard, setrCurrentBoard, boards }: any) {
  const { isOpen: isBoardOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(true);
  const { colorMode } = useColorMode();

  return (
    <Box
      display={["none", "flex"]}
      minW={["260px", "260px", "301px"]}
      borderRight={"1px solid"}
      borderColor={colorMode === "dark" ? "lines_dark" : "lines_light"}
      height={"100%"}
      boxShadow={"none"}
      flexDir={"column"}
      justifyContent={"space-between"}
      pb="1rem"
      bg={colorMode === "dark" ? "dark_Grey" : "white"}
      transform={isOpen ? "translateX(0%)" : "translateX(-100%)"}
      transition={"300ms ease-in-out"}
    >
      <DrawerBody
        handleNewBoard={onOpen}
        setColumns={setColumns}
        boards={boards}
        currentBoard={currentBoard}
        setrCurrentBoard={setrCurrentBoard}
      />
      <DrawerFooter closeDrawer={() => setIsOpen(false)} />
      <ShowDrawer isOpen={isOpen} setOpen={() => setIsOpen(true)} />
      <EditBoard isOpen={isBoardOpen} onClose={onClose} />
    </Box>
  );
}

export default MyDrawer;
