import { Flex, Img, Switch, useColorMode } from "@chakra-ui/react";
import sun from "../../assets/icon-light-theme.svg";
import moon from "../../assets/icon-dark-theme.svg";
function index() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      gap="1.25rem"
      bg={
        colorMode === "dark" ? "very_dark_grey_dark_bg" : "light_grey_light_bg"
      }
      h="50px"
      w="100%"
    >
      <Img src={sun} alt="light" />
      <Switch onChange={toggleColorMode} isChecked={colorMode === "dark"} />
      <Img src={moon} alt="dark" />
    </Flex>
  );
}

export default index;
