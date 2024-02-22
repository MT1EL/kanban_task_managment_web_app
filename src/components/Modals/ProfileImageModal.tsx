import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  Flex,
  useToast,
  Img,
  Progress,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { database, storage } from "../../../firebase";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import close from "../../assets/icon-cross.svg";
function ProfileImageModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [downloadURL, setDownloadURL] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const toast = useToast();

  const handleUpload = (file: any) => {
    if (file[0]) {
      const storageRef = ref(storage, `profileImages/${file[0].name}`); // Create a storage reference from our storage service
      const uploadTask = uploadBytesResumable(storageRef, file[0]); // Upload the file and metadata

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          return await getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadUrl) => {
              const user = getAuth().currentUser;
              updateProfile(user, { photoURL: downloadUrl }).then(() => {
                setDownloadURL(downloadUrl);
                const userRef = doc(database, "users", user.uid);
                updateDoc(userRef, { avatar: downloadUrl })
                  .then(() => {
                    toast({
                      status: "success",
                      title: "Profile Image Updated",
                      description:
                        "Your profile image has been updated successfully",
                    });
                  })
                  .catch((error) => console.log(error));
              });
            }
          );
        }
      );
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        p="2rem"
        mx="1rem"
        gap="1.5rem"
        w="480px"
        maxW="100%"
        my="auto"
      >
        <ModalHeader p="0">
          <Text fontWeight={"bold"} fontSize={"18px"}>
            Upload your profile image
          </Text>
        </ModalHeader>
        <ModalBody gap="1.5rem" display={"flex"} flexDir={"column"} p="0">
          <Dropzone onDrop={(file) => handleUpload(file)}>
            {({ getRootProps, getInputProps }) => (
              <Flex
                minH="150px"
                border="2px dashed red"
                {...getRootProps()}
                position={"relative"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {downloadURL && (
                  <>
                    <Img
                      src={downloadURL}
                      alt="profile"
                      maxH="450px"
                      w="100%"
                      objectFit={"cover"}
                    />
                    <Box
                      position={"absolute"}
                      top="-10px"
                      right={"-10px"}
                      p="2.5px "
                      onClick={() => setDownloadURL("")}
                    >
                      <Img src={close} alt="close" />
                    </Box>
                  </>
                )}
                <input {...getInputProps()} />
                {!downloadURL && (
                  <Text>Click Here or Drop your profile image </Text>
                )}
              </Flex>
            )}
          </Dropzone>
          <Progress value={progress} />
        </ModalBody>

        <ModalFooter p="0" gap="1rem" flexDir={"column"}>
          {downloadURL ? (
            <Button onClick={onClose}>finish</Button>
          ) : (
            <>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button>Upload</Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProfileImageModal;
