import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
const TopNav = () => {
  return (
    <Flex justifyContent={"space-between"}>
      <Box></Box>
      <Box>
        <Button variant={"secondary"} height={"35px"}>
          Premium
        </Button>
      </Box>
    </Flex>
  );
};
export default TopNav;
