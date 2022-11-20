import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/auth";
const TopNav = () => {
  const router = useRouter();
  const isAuthenticated = useAuth().isAuthenticated();
  const onClickFunc = () => {
    router.push(isAuthenticated ? "/premium" : "login");
  };

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
      bg={"white"}
      left={0}
    >
      <Button
        variant={"primaryInverse"}
        height={"30px"}
        marginRight={"30px"}
        marginTop={"10px"}
        position={"relative"}
        onClick={onClickFunc}
      >
        {isAuthenticated ? "Go Premiun" : "Login"}
      </Button>
    </Flex>
  );
};
export default TopNav;
