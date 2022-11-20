import { ChakraProps } from "@chakra-ui/react";
import { BLUE_100, BLUE_100_HOVER, RED_100, RED_100_HOVER } from "./colors";

export const baseStyles: ChakraProps = {
  borderRadius: "50px",
  minWidth: "max-content",
  textTransform: "capitalize",
  color: "white",
};

export const solidButton = () => {
  const styles: ChakraProps = {
    bg: RED_100,
    _hover: {
      bg: RED_100_HOVER,
    },
    ...baseStyles,
  };
  return styles;
};

export const secondaryButton = () => {
  return {
    bg: BLUE_100,
    _hover: {
      bg: BLUE_100_HOVER,
    },
    ...baseStyles,
  };
};
