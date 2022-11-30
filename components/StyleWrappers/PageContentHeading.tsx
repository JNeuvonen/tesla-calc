import { ChakraProps, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function PageContentHeading(props: Props & ChakraProps) {
  return <Heading fontSize={"25px"}>{props.children}</Heading>;
}
