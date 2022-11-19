import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} height={"30vh"}>
      <Spinner size={"md"} />
    </Flex>
  );
}
