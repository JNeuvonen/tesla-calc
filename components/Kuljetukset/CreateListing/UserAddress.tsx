import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { isErrored } from "stream";
import { ErroredFieldOptions } from ".";
import { RED_100 } from "../../../chakra/colors";
import { SMALL_BUTTON_HEIGHT } from "../../../chakra/constants";
import BorderDiv from "../../StyleWrappers/BorderDiv";
import GreyText from "../../StyleWrappers/GreyText";

export default function UserAddress({
  address,
  setOriginAddress,
  suggestedOriginAddress,
  erroredField,
}: {
  address: string;
  setOriginAddress: React.Dispatch<React.SetStateAction<string>>;
  suggestedOriginAddress: string;
  erroredField: ErroredFieldOptions;
}) {
  const [askIfAddressIsCorrect, setAskIfAddressIsCorrect] = useState(false);
  const [isAddressCorrect, setIsAddressCorrect] = useState(false);

  const returnInputField = () => {
    if (isAddressCorrect) {
      return (
        <Flex columnGap={"32px"} maxWidth={"800px"}>
          <Flex
            maxWidth={""}
            width={"100%"}
            flexWrap={"wrap"}
            columnGap={"16px"}
            fontSize={"19px"}
            flexDir={"row"}
            alignItems={"center"}
          >
            <GreyText>{address}</GreyText>
            <Button
              padding={"4px 16px"}
              width={"max-content"}
              borderRadius={"10px"}
              height={"25px"}
              variant={"primaryInverse"}
            >
              <Text
                cursor={"pointer"}
                fontSize={"12px"}
                onClick={() => setIsAddressCorrect(false)}
              >
                Muuta
              </Text>
            </Button>
          </Flex>
        </Flex>
      );
    }

    return (
      <Box maxWidth={"800px"} width={"100%"}>
        <Box marginTop={"5px"}>
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            apiOptions={{ language: "fi" }}
            selectProps={{
              onChange: setOriginAddress,
            }}
          />
        </Box>
      </Box>
    );
  };

  const getAddressInputField = () => {
    return askIfAddressIsCorrect ? (
      returnInputField()
    ) : (
      <Box>
        <BorderDiv maxW={"800px"} width={"100%"} marginTop={"5px"}>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            columnGap={"32px"}
            rowGap={"32px"}
            flexWrap={"wrap"}
          >
            <Text fontWeight={"500"}>
              Onko {suggestedOriginAddress} lähtösijainti?
            </Text>
            <Flex columnGap={"16px"}>
              <Button
                variant={"secondary"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => {
                  setAskIfAddressIsCorrect(true);
                  setIsAddressCorrect(true);
                  setOriginAddress(suggestedOriginAddress);
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
                  setAskIfAddressIsCorrect(true);
                  setIsAddressCorrect(false);
                }}
              >
                Ei
              </Button>
            </Flex>
          </Flex>
        </BorderDiv>
      </Box>
    );
  };
  return (
    <Box id={"origin-address"}>
      <Box marginTop={"32px"}>
        <Text
          fontSize={"19px"}
          fontWeight={"bold"}
          color={erroredField === "origin-address" ? RED_100 : "black"}
        >
          Sijanti
        </Text>
        {getAddressInputField()}
      </Box>
    </Box>
  );
}
