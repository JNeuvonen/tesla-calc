import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/auth";
const TopNav = () => {
  const router = useRouter();
  const auth = useAuth();
  return (
    <Flex
      justifyContent={"space-between"}
      flexDir={"row-reverse"}
      position={"fixed"}
      zIndex={2}
      width={"100%"}
      id={"header"}
      height={"50px"}
      top={0}
      left={0}
    >
      <Button
        variant={"primaryInverse"}
        height={"30px"}
        marginRight={"25px"}
        marginTop={"10px"}
        position={"relative"}
      >
        Go Premium
      </Button>
    </Flex>
  );
};
export default TopNav;
