import { VStack, Flex, useColorMode, Img, Text } from "@chakra-ui/react";
import ThemeSwitcher from "../ThemeToggle/";
import hideIcon from "../../assets/icon-hide-sidebar.svg";
function DrawerFooter({ closeDrawer }: { closeDrawer: any }) {
  const { colorMode } = useColorMode();
  return (
    <VStack w="100%" alignItems={"flex-start"} gap="0.375rem" pr="1.5rem">
      <Text px="1.5rem" as="a" href="/profile">
        proifle
      </Text>
      <ThemeSwitcher />
      <Flex
        gap="1rem"
        alignItems={"center"}
        cursor={"pointer"}
        py="0.5rem"
        _hover={{
          bg:
            colorMode === "dark"
              ? "very_dark_grey_dark_bg"
              : "light_grey_light_bg",
        }}
        borderRightRadius={"1rem"}
        onClick={closeDrawer}
        px="1.5rem"
        w="100%"
      >
        <Img src={hideIcon} alt="hide sidebar" />
        <Text>Hide Sidebar</Text>
      </Flex>
    </VStack>
  );
}

export default DrawerFooter;
