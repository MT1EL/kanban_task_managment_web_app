import { Flex, Img, useColorMode } from "@chakra-ui/react";
import darkLogo from "../../assets/logo-dark.svg";
import lightLogo from "../../assets/logo-light.svg";
import mobileLogo from "../../assets/logo-mobile.svg";
function Logo() {
  const { colorMode } = useColorMode();
  return (
    <Flex
      p={["0", "1.5rem"]}
      pl={["0", "2.125rem"]}
      minW={["fit-content", "260px", "300px"]}
      alignItems={"center"}
      as="a"
      href="/"
    >
      <Img
        display={["none", "block"]}
        src={colorMode === "dark" ? lightLogo : darkLogo}
        alt="logo"
        mr="2rem"
      />
      <Img display={["block", "none"]} src={mobileLogo} alt="mobile logo" />
    </Flex>
  );
}

export default Logo;
