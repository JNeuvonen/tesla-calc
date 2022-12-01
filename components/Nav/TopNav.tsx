import { Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SIDE_MENU_WIDTH } from "../../chakra/constants";
import { useAuth } from "../../context/auth";
import useWindowDimensions from "../../utils/hooks/windowDimensions";
const TopNav = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isAuthenticated = useAuth().isAuthenticated();
  const onClickFunc = () => {
    router.push(isAuthenticated ? "/premium" : "login");
  };

  return (
    <Flex
      justifyContent={"space-between"}
      flexDir={"row-reverse"}
      position={"fixed"}
      width={`calc(100% - ${SIDE_MENU_WIDTH})`}
      marginLeft={SIDE_MENU_WIDTH}
      zIndex={2}
      id={"header"}
      bg={"white"}
      height={"50px"}
      top={0}
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
        {isAuthenticated ? "Account" : "Login"}
      </Button>

      {width > 1000 && (
        <Heading fontSize={"24px"} marginTop={"12px"} marginLeft={"24px"}>
          Calculate
        </Heading>
      )}
    </Flex>
  );
};
export default TopNav;
