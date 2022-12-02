import { Box, Button, Flex } from "@chakra-ui/react";
import { DriveDetails } from ".";
import GreyText from "../../StyleWrappers/GreyText";

type Props = {
  driveDetails: DriveDetails;
  origin: any;
  target: any;
};

export default function SubmitModalContent({
  driveDetails,
  origin,
  target,
}: Props) {
  return (
    <Box paddingBottom={"30px"}>
      <Box marginTop={"16px"}>
        <Flex flexDir={"column"} rowGap={"10px"}>
          <GreyText>Pituus: {driveDetails.distance}</GreyText>
          <GreyText>Arvioitu kesto: {driveDetails.duration}</GreyText>

          <GreyText>Aloitussijainti: {getAddressFromOrigin(origin)}</GreyText>
          <GreyText>Määränpää: {target.label}</GreyText>
        </Flex>
      </Box>

      <Flex
        width={"100%"}
        flexDir={"column"}
        rowGap={"16px"}
        marginTop={"16px"}
      >
        <Button width={"100%"} textTransform={"initial"}>
          Lähetä
        </Button>
        <Button
          width={"100%"}
          variant={"primaryInverse"}
          textTransform={"initial"}
        >
          Takaisin
        </Button>
      </Flex>
    </Box>
  );
}

export const getAddressFromOrigin = (origin: any) => {
  if (typeof origin === "string") {
    return origin;
  }

  return origin?.label;
};
