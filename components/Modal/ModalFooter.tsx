import { Box, Flex } from "@chakra-ui/react";

type Props = {
  leftButton: React.ReactNode;
  rightButton: React.ReactNode;
};

export default function ModalFooterWrapper(props: Props) {
  const { leftButton, rightButton } = props;
  return (
    <Box paddingTop={"25px"} paddingBottom={"20px"} width={"100%"}>
      <Flex justifyContent={"space-between"} width={"100%"}>
        {leftButton}
        {rightButton}
      </Flex>
    </Box>
  );
}
