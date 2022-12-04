import { Button, Flex, Heading, useStatStyles } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { SIDE_MENU_WIDTH } from "../../chakra/constants";
import { useAuth } from "../../context/auth";
import { getPathLastItem } from "../../utils/functions/general";
import useWindowDimensions from "../../utils/hooks/windowDimensions";
const TopNav = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isAuthenticated = useAuth().isAuthenticated();
  const onClickFunc = () => {
    router.push(isAuthenticated ? "/premium" : "/login");
  };
  const [nonNormalPaths] = useState(["kiitos"]);

  const getHeader = () => {
    const path = router.asPath;

    if (path === undefined) {
      return "Roudaaja";
    }

    let header = "";

    nonNormalPaths.forEach((item) => {
      if (path.includes(item)) {
        header = item;
      }
    });

    if (header) {
      return header;
    }

    return getPathLastItem(path);
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
        <Heading
          fontSize={"24px"}
          marginTop={"12px"}
          marginLeft={"24px"}
          textTransform={"capitalize"}
        >
          {getHeader()}
        </Heading>
      )}
    </Flex>
  );
};
export default TopNav;
