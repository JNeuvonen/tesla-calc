import { ChakraProps, Text } from "@chakra-ui/react";
import { BLUE_100 } from "../../chakra/colors";

type Props = {
  children?: React.ReactNode;
};
export default function BlueText(props: Props & ChakraProps) {
  return (
    <Text {...props} color={BLUE_100}>
      {props.children}
    </Text>
  );
}
