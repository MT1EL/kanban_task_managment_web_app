import { useColorMode, Box } from "@chakra-ui/react";
import ShowDrawer from "./ShowDrawer";
import DrawerFooter from "./DrawerFooter";
import { useState } from "react";
import DrawerBody from "./DrawerBody";
function MyDrawer() {
  const [isOpen, setIsOpen] = useState(true);
  const { colorMode } = useColorMode();
  return (
    <Box
      display={["none", "flex"]}
      w={["260px", "260px", "301px"]}
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
      <DrawerBody />
      <DrawerFooter closeDrawer={() => setIsOpen(false)} />
      <ShowDrawer isOpen={isOpen} setOpen={() => setIsOpen(true)} />
    </Box>
  );
}

export default MyDrawer;
