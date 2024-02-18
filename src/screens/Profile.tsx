import { Flex, Spinner } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import ProfileDrawer from "../components/Drawer/ProfileDrawer";
import { useState } from "react";
import ProfileLayout from "../layouts/Profile/";
import Boards from "../layouts/Profile/Boards";
import Security from "../layouts/Profile/Security";
import Notifications from "../layouts/Profile/Notifications";
function Profile() {
  const user = getAuth().currentUser;
  const [currentLink, setCurrentLink] = useState(0);
  if (!user) {
    return <Spinner />;
  }
  const components = [
    <ProfileLayout user={user} />,
    <Boards user={user} />,
    <Security user={user} />,
    <Notifications user={user} />,
  ];
  return (
    <Flex mt="90px">
      <ProfileDrawer
        currentLink={currentLink}
        setCurrentLink={setCurrentLink}
      />
      <Flex
        ml={["1rem", "calc(2rem + 260px)", "calc(2rem + 301px)"]}
        mr={["1rem", "2rem", "3rem"]}
        w="100%"
        my="2rem"
      >
        {components[currentLink]}
      </Flex>
    </Flex>
  );
}

export default Profile;
