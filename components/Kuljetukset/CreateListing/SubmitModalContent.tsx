import { Box, Button, Flex } from "@chakra-ui/react";
import { DriveDetails } from "./types";
import GreyText from "../../StyleWrappers/GreyText";
import LoadingSpinner from "../../Util/LoadingSpinner";
import ResponsiveImage from "../../Util/ResponsiveImage";

type Props = {
  driveDetails: DriveDetails;
  origin: any;
  target: any;
  mainpictureForForm: string;
  sendData: () => void;
};

export default function SubmitModalContent({
  driveDetails,
  origin,
  target,
  mainpictureForForm,
  sendData,
}: Props) {
  if (!mainpictureForForm) {
    return <LoadingSpinner />;
  }
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

      <Box marginTop={"16px"}>
        <GreyText fontWeight={"bold"}>Ilmoituksen kuva</GreyText>
        <Box marginTop={"6px"}>
          <ResponsiveImage src={mainpictureForForm} />
        </Box>
      </Box>

      <Flex
        width={"100%"}
        flexDir={"column"}
        rowGap={"16px"}
        marginTop={"16px"}
      >
        <Button width={"100%"} textTransform={"initial"} onClick={sendData}>
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
