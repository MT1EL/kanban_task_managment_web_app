import { Flex, Img } from "@chakra-ui/react";
import eye from "../../assets/icon-show-sidebar.svg";

function ShowDrawer({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: () => void;
}) {
  return (
    <Flex
      position={"absolute"}
      top="90%"
      left={"100%"}
      w="3.5rem"
      h="3rem"
      justifyContent={"center"}
      alignItems={"center"}
      bg="main_purple"
      borderRightRadius={"2rem"}
      cursor={"pointer"}
      onClick={setOpen}
      display={isOpen ? "none" : "flex"}
    >
      <Img src={eye} alt="show sidebar" />
    </Flex>
  );
}

export default ShowDrawer;
