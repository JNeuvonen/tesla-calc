import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SMALL_BUTTON_HEIGHT } from "../../../chakra/constants";
import BorderDiv from "../../StyleWrappers/BorderDiv";
import GreyText from "../../StyleWrappers/GreyText";
import { ErroredFieldOptions } from ".";

export default function TargetAddress({
  setTargetAddress,
  erroredField,
}: {
  setTargetAddress: React.Dispatch<React.SetStateAction<string>>;
  erroredField: ErroredFieldOptions;
}) {
  const [askForTargetAddress, setAskForTargetAddress] = useState("INIT");

  const getTargetAddress = () => {
    if (askForTargetAddress === "INIT") {
      return (
        <BorderDiv
          maxW={"800px"}
          width={"100%"}
          marginTop={"5px"}
          isErrored={erroredField === "target-address"}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            columnGap={"32px"}
            rowGap={"32px"}
            flexWrap={"wrap"}
          >
            <Text fontWeight={"500"}>
              Onko tavaroiden määränpää kaatopaikka tai kierrätyskeskus?
            </Text>
            <Flex columnGap={"16px"}>
              <Button
                variant={"secondary"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => {
                  setAskForTargetAddress("RECYCLING");
                }}
              >
                Kyllä
              </Button>
              <Button
                variant={"secondaryInverse"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => {
                  setAskForTargetAddress("QUERY");
                }}
              >
                Ei
              </Button>
            </Flex>
          </Flex>
        </BorderDiv>
      );
    }

    if (askForTargetAddress === "RECYCLING") {
      return (
        <Box>
          <Flex
            maxWidth={"800px"}
            width={"100%"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            rowGap={"5px"}
            fontSize={"19px"}
          >
            <GreyText>
              Kaatopaikan, kierrätyspisteen tai sortausaseman osoite
            </GreyText>
          </Flex>
          <Box maxWidth={"800px"} width={"100%"} marginTop={"5px"}>
            <GooglePlacesAutocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              apiOptions={{ language: "Finnish" }}
              selectProps={{
                onChange: setTargetAddress,
              }}
            />
          </Box>
        </Box>
      );
    }

    return (
      <Box maxWidth={"800px"} width={"100%"} marginTop={"5px"}>
        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          apiOptions={{ language: "fi" }}
          selectProps={{
            onChange: setTargetAddress,
          }}
        />
      </Box>
    );
  };
  return (
    <Box id={"target-address"}>
      <Text fontSize={"19px"} fontWeight={"bold"}>
        Määränpää
      </Text>
      {getTargetAddress()}
    </Box>
  );
}
