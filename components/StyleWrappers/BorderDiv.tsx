import { Box, ChakraProps } from "@chakra-ui/react";
import React from "react";
import { GREY_200 } from "../../chakra/colors";
import { BOX_SHADOW_100 } from "../../chakra/constants";

type Props = {
  children?: React.ReactNode;
};

export default function BorderDiv(
  props: Props &
    ChakraProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
) {
  const { children } = props;
  return (
    <Box
      border={`1px solid ${GREY_200}`}
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
