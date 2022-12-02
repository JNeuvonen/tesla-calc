import { Box, Button, Flex } from "@chakra-ui/react";
import GreyText from "../StyleWrappers/GreyText";

export default function SubmitModalContent() {
  return (
    <Box paddingBottom={"30px"}>
      <GreyText>
        Haluatko vielä varmistaa ovatko antamasi tiedot oikein?
      </GreyText>

      <Flex
        width={"100%"}
        flexDir={"column"}
        rowGap={"16px"}
        marginTop={"16px"}
      >
        <Button width={"100%"} textTransform={"initial"}>
          En, lomake on valmis
        </Button>
        <Button
          width={"100%"}
          variant={"primaryInverse"}
          textTransform={"initial"}
        >
          Palaa lomaakkeeseen
        </Button>
      </Flex>
    </Box>
  );
}
