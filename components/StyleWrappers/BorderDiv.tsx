import { Box, ChakraProps } from "@chakra-ui/react";
import React from "react";
import { GREY_100, GREY_200, RED_100 } from "../../chakra/colors";
import { BOX_SHADOW_100 } from "../../chakra/constants";

type Props = {
  children?: React.ReactNode;
  isErrored?: boolean;
};

export default function BorderDiv(
  props: Props &
    ChakraProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
) {
  const { children, isErrored } = props;

  const redBorderActive = isErrored === undefined ? false : isErrored;
  return (
    <Box
      border={`1px solid ${redBorderActive ? RED_100 : GREY_200}`}
      {...props}
      borderRadius={"10px"}
      padding={"16px"}
      _hover={{
        boxShadow: BOX_SHADOW_100,
      }}
    >
      {children}
    </Box>
  );
}
