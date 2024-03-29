import {
  Text,
  Button,
  Flex,
  Input,
  Link,
  useColorMode,
} from "@chakra-ui/react";

function index({
  type,
  inputs,
  formik,
}: {
  type: "Log in" | "Register";
  inputs: any[];
  formik: any;
}) {
  const { colorMode } = useColorMode();
  return (
    <Flex
      h="100%"
      alignItems={"center"}
      justifyContent={"center"}
      as="form"
      mx="20px"
    >
      <Flex
        flexDir={"column"}
        gap="1.5rem"
        p="2rem"
        borderRadius={"1rem"}
        w="400px"
        maxW="100%"
        bg={colorMode === "dark" ? "dark_Grey" : "white"}
      >
        <Text textTransform={"uppercase"} fontWeight={"bold"} fontSize={"18px"}>
          {type.toUpperCase()}
        </Text>
        <Flex flexDir={"column"} gap="0.5rem">
          {inputs.map((input) => (
            <Flex key={input} flexDir={"column"} gap="0.25rem">
              <Input
                placeholder={`Enter your ${input}`}
                name={input}
                onChange={formik.handleChange}
                type={input?.includes("password") ? "password" : "text"}
              />
              {formik.errors[input] && formik.touched[input] && (
                <Text color="red">{formik.errors[input]}</Text>
              )}
            </Flex>
          ))}
        </Flex>
        <Flex flexDir={"column"} gap="0.5rem" alignItems={"center"}>
          <Button
            variant={"primary"}
            onClick={formik.handleSubmit}
            type="submit"
          >
            {type}
          </Button>
          <Flex alignItems={"center"} gap="0.25rem">
            <Text fontWeight={"medium"} fontSize={"13px"} lineHeight={"23px"}>
              {type === "Register"
                ? "Already have an accoung?"
                : "Don't have an account?"}
            </Text>

            <Link
              color="red"
              href={type === "Register" ? "/login" : "/register"}
            >
              {type === "Register" ? "login" : "create one."}
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default index;
