import { Flex } from "@chakra-ui/react";
import ProfileDrawer from "../components/Drawer/ProfileDrawer";
import { useState } from "react";
import { Outlet } from "react-router-dom";
function Profile() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [currentLink, setCurrentLink] = useState(0);

  return (
    <Flex mt="90px">
      <ProfileDrawer
        currentLink={currentLink}
        setCurrentLink={setCurrentLink}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <Flex
        ml={
          isDrawerOpen
            ? ["1rem", "calc(2rem + 260px)", "calc(2rem + 301px)"]
            : ["1rem", "2rem", "2rem"]
        }
        mr={["1rem", "2rem", "3rem"]}
        w="100%"
        my="2rem"
        transition={"300ms ease-in-out"}
      >
        <Outlet />
      </Flex>
    </Flex>
  );
}

export default Profile;
