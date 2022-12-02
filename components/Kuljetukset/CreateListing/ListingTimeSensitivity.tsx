import { Box, Button, Checkbox, Flex, Text } from "@chakra-ui/react";
import { Calendar } from "react-calendar";
import { SMALL_BUTTON_HEIGHT } from "../../../chakra/constants";
import { getDateFormatted } from "../../../utils/functions/general";
import BorderDiv from "../../StyleWrappers/BorderDiv";
import GreyText from "../../StyleWrappers/GreyText";
import {
  DateOptions,
  ErroredFieldOptions,
  ListingTimeSensitivityQuery,
} from ".";
import { RED_100 } from "../../../chakra/colors";

export default function ListingTimeSensitivity({
  isListingTimeSensitive,
  setIsListingTimeSensitive,
  selectedDate,
  setSelectedDate,
  dateType,
  setDateType,
  erroredField,
}: {
  isListingTimeSensitive: ListingTimeSensitivityQuery;
  setIsListingTimeSensitive: React.Dispatch<
    React.SetStateAction<ListingTimeSensitivityQuery>
  >;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  dateType: DateOptions;
  setDateType: React.Dispatch<React.SetStateAction<DateOptions>>;
  erroredField: ErroredFieldOptions;
}) {
  const conditionalRendering = () => {
    if (isListingTimeSensitive === "NOT_ANSWERED") {
      return (
        <BorderDiv
          maxW={"800px"}
          width={"100%"}
          marginTop={"5px"}
          isErrored={erroredField === "listing-time-sensitivity"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text
              fontWeight={"500"}
              color={
                erroredField === "listing-time-sensitivity" ? RED_100 : "black"
              }
            >
              Onko kuljetuksen ajankohdalla merkitystä?
            </Text>

            <Flex columnGap={"16px"}>
              <Button
                variant={"secondary"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => setIsListingTimeSensitive("YES")}
              >
                Kyllä
              </Button>
              <Button
                variant={"secondaryInverse"}
                minWidth={"75px"}
                maxWidth={"max-content"}
                height={SMALL_BUTTON_HEIGHT}
                onClick={() => setIsListingTimeSensitive("NO")}
              >
                Ei
              </Button>
            </Flex>
          </Flex>
        </BorderDiv>
      );
    }

    if (isListingTimeSensitive === "YES") {
      return (
        <Box marginTop={"16px"}>
          <Flex columnGap={"16px"} flexWrap={"wrap"} rowGap={"16px"}>
            <Flex columnGap={"10px"}>
              <Checkbox
                isChecked={dateType === "SINGULAR_DATE" ? true : false}
                onChange={() => setDateType("SINGULAR_DATE")}
              />
              <GreyText>Yksittäinen ajankohta</GreyText>
            </Flex>

            <Flex columnGap={"10px"}>
              <Checkbox
                isChecked={dateType === "RANGE" ? true : false}
                onChange={() => setDateType("RANGE")}
              />
              <GreyText>Useampi päivä</GreyText>
            </Flex>

            <Flex columnGap={"10px"}>
              <Checkbox
                isChecked={dateType === "AFTER_DATE" ? true : false}
                onChange={() => setDateType("AFTER_DATE")}
              />
              <GreyText>Haluan kuljetuksen jonkin ajankohdan jälkeen</GreyText>
            </Flex>
          </Flex>

          <Flex
            marginTop={"16px"}
            flexWrap={"wrap"}
            columnGap={"16px"}
            rowGap={"16px"}
          >
            <GreyText>{getDateFormatted(selectedDate, dateType)}</GreyText>
            <Button
              padding={"4px 16px"}
              width={"max-content"}
              borderRadius={"10px"}
              height={"25px"}
              variant={"primaryInverse"}
              textTransform={"none"}
              onClick={() => setIsListingTimeSensitive("NO")}
            >
              <Text cursor={"pointer"} fontSize={"12px"}>
                Ajanhetkellä ei ole väliä
              </Text>
            </Button>
          </Flex>

          <Box maxWidth={"400px"} width={"100%"} marginTop={"16px"}>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              selectRange={dateType === "RANGE" ? true : false}
            />
          </Box>
        </Box>
      );
    }

    if (isListingTimeSensitive === "NO") {
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
            <GreyText>
              Kuljetus tapahtuu mahdollisimman pian, mutta ajankohdalla ei ole
              merkitystä
            </GreyText>
            <Button
              padding={"4px 16px"}
              width={"max-content"}
              borderRadius={"10px"}
              height={"25px"}
              variant={"primaryInverse"}
              onClick={() => setIsListingTimeSensitive("YES")}
            >
              <Text cursor={"pointer"} fontSize={"12px"}>
                Muuta
              </Text>
            </Button>
          </Flex>
        </Box>
      );
    }

    return null;
  };
  return (
    <Box id={"listing-time-sensitivity"}>
      <Text
        fontSize={"19px"}
        fontWeight={"bold"}
        color={erroredField === "listing-time-sensitivity" ? RED_100 : "black"}
      >
        Ajankohta
      </Text>
      {conditionalRendering()}
    </Box>
  );
}
