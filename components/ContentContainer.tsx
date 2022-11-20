import { Box } from "@chakra-ui/react";
import { GREY_100 } from "../chakra/colors";
import { SIDE_MENU_WIDTH } from "../chakra/constants";

export default function ContentContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Box
      padding={"26px"}
      width={`calc(100%-${SIDE_MENU_WIDTH})`}
      marginLeft={SIDE_MENU_WIDTH}
      minHeight={"100vh"}
      position={"relative"}
      bg={GREY_100}
      id={"content-section"}
      marginTop={"50px"}
    >
      <Box
        backgroundColor={"white"}
        width={"100%"}
        minHeight={"85vh"}
        height={"max-content"}
        p={"24px"}
      >
        {children}
      </Box>
    </Box>
  );
}
