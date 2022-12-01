import { ChakraProps, Text } from "@chakra-ui/react";
import { RED_100 } from "../../chakra/colors";

type Props = {
  children?: React.ReactNode;
};
export default function ErrorText(props: Props & ChakraProps) {
  return (
    <Text {...props} color={RED_100}>
      {props.children}
    </Text>
  );
}
