import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { SMALL_BUTTON_HEIGHT } from "../../chakra/constants";
import BorderDiv from "../StyleWrappers/BorderDiv";
import GreyText from "../StyleWrappers/GreyText";
import { ErroredFieldOptions, PreciousCargo } from "./createListing";

export default function IsCargoPrecious({
  isCargoPrecious,
  setIsCargoPrecious,
  erroredField,
}: {
  isCargoPrecious: PreciousCargo;
  setIsCargoPrecious: React.Dispatch<React.SetStateAction<PreciousCargo>>;
  erroredField: ErroredFieldOptions;
}) {
  const conditionalRendering = () => {
    if (isCargoPrecious === "NOT_ANSWERED") {
      return (
        <BorderDiv
          maxW={"800px"}
          width={"100%"}
          marginTop={"5px"}
          isErrored={erroredField === "drivers-risk"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontWeight={"500"}>
              Onko tavara helposti rikkoutuvaa tai vaatiiko tavaran
              kuljettaminen erityistä huolellisuutta?
            </Text>

            <Flex columnGap={"16px"}>
              <Button
                variant={"secondary"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => setIsCargoPrecious("IS_PRECIOUS")}
              >
                Kyllä
              </Button>
              <Button
                variant={"secondaryInverse"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => setIsCargoPrecious("NOT_PRECIOUS")}
              >
                Ei
              </Button>
            </Flex>
          </Flex>
        </BorderDiv>
      );
    }

    if (isCargoPrecious === "IS_PRECIOUS") {
      return (
        <Box>
          <Flex
            maxWidth={""}
            width={"100%"}
            flexWrap={"wrap"}
            columnGap={"16px"}
            rowGap={"16px"}
            fontSize={"19px"}
            flexDir={"row"}
            alignItems={"center"}
          >
            <GreyText>Tavallista enemmän vastuuta</GreyText>
            <Button
              padding={"4px 16px"}
              width={"max-content"}
              borderRadius={"10px"}
              height={"25px"}
              variant={"primaryInverse"}
              onClick={() => setIsCargoPrecious("NOT_PRECIOUS")}
            >
              <Text cursor={"pointer"} fontSize={"12px"}>
                Vaihda
              </Text>
            </Button>
          </Flex>
        </Box>
      );
    }

    if (isCargoPrecious === "NOT_PRECIOUS") {
      return (
        <Box>
          <Flex
            maxWidth={""}
            width={"100%"}
            flexWrap={"wrap"}
            columnGap={"16px"}
            rowGap={"16px"}
            fontSize={"19px"}
            flexDir={"row"}
            alignItems={"center"}
          >
            <GreyText>Ei ole suurta riskiä</GreyText>
            <Button
              padding={"4px 16px"}
              width={"max-content"}
              borderRadius={"10px"}
              height={"25px"}
              variant={"primaryInverse"}
              onClick={() => setIsCargoPrecious("IS_PRECIOUS")}
            >
              <Text cursor={"pointer"} fontSize={"12px"}>
                Vaihda
              </Text>
            </Button>
          </Flex>
        </Box>
      );
    }

    return null;
  };
  return (
    <Box id={"drivers-risk"}>
      <Text fontSize={"19px"} fontWeight={"bold"}>
        Kuljettajan vastuu
      </Text>

      {conditionalRendering()}
    </Box>
  );
}
