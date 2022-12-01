import { ChakraProps, Text, TextProps } from "@chakra-ui/react";
import { TEXT_BLACK_100 } from "../../chakra/colors";

type Props = {
  children?: React.ReactNode;
};

export default function GreyText(props: Props & ChakraProps & TextProps) {
  return (
    <Text color={TEXT_BLACK_100} fontWeight={"600"} {...props}>
      {props.children}
    </Text>
  );
}
