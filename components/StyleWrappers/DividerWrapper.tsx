import { ChakraProps, Divider } from "@chakra-ui/react";

type Props = {
  verticalMargin: string | number;
};

export default function DividerWrapper(props: Props & ChakraProps) {
  const { verticalMargin, ...restOfProps } = props;
  return (
    <Divider
      marginTop={verticalMargin}
      marginBottom={verticalMargin}
      {...restOfProps}
    />
  );
}
