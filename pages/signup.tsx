import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Text,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import BlueText from "../components/StyleWrappers/BlueText";
import BorderDiv from "../components/StyleWrappers/BorderDiv";
import DividerWrapper from "../components/StyleWrappers/DividerWrapper";
import GreyText from "../components/StyleWrappers/GreyText";
import TextInputLifeFeedback from "../components/TextInputLifeFeedback";
import { useAuth } from "../context/auth";
import { getGeocodeEndpoint } from "../services/google/endpoints";
import { GoogleAutoCompleteRes } from "../types/responses/autocomplete-address";
import {
  containsAnyLetters,
  getInputFieldValById,
} from "../utils/functions/general";
import { BoxOfStuffIcon, TrolleyIcon } from "../utils/icons";
import { customErrorToast } from "../utils/toasts";
import { ContentStyles } from "./login";

const Login = () => {
  const [modeSelected, setModeSelected] = useState<"SELECT-ROLE" | "FILL-FORM">(
    "SELECT-ROLE"
  );

  const [role, setRole] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [address, setAddress] = useState<null | GoogleAutoCompleteRes>(null);
  const auth = useAuth();
  const toast = useToast();

  const validateEmail = (input: string) => {
    const isValid = isEmail(input);
    setEmailIsValid(isValid);
    return isValid;
  };

  const validatePassword = (input: string) => {
    const isValid = isStrongPassword(input, {
      returnScore: true,
    });
    setPasswordIsValid(isValid > 30);
    return isValid > 30;
  };

  const formIsValid = () => {
    return (
      emailIsValid &&
      passwordIsValid &&
      address &&
      validatePhoneNumber(getInputFieldValById("phone-number") as string)
    );
  };

  const validatePhoneNumber = (input: string) => {
    if (containsAnyLetters(input)) {
      return false;
    }

    if (input.length < 9) {
      return false;
    }

    return true;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = getInputFieldValById("email");
    const password = getInputFieldValById("password");
    const firstName = getInputFieldValById("firstName");
    const lastName = getInputFieldValById("lastName");
    const phoneNumber = getInputFieldValById("phone-number");

    const geocode = await fetch(getGeocodeEndpoint(address?.label as string));

    const parsedGeocode = await geocode.json();
    const { lat, lng } = parsedGeocode.results[0].geometry.location;
    const addressObject = {
      address: address?.label as string,
      lat,
      lng,
    };

    if (email && password && address) {
      auth.signup({
        email: email.toLowerCase(),
        password,
        role,
        firstName: firstName as string,
        lastName: lastName as string,
        phoneNumber: phoneNumber as string,
        address: addressObject,
      });
    }
  };

  if (modeSelected === "SELECT-ROLE") {
    return (
      <ContentStyles>
        <Flex flexDir={"column"} justifyItems={"center"} rowGap={"32px"}>
          <Heading fontSize={"42px"}>Haluan...</Heading>

          <Flex flexDir={"column"} rowGap={"32px"}>
            <BorderDiv
              cursor={"pointer"}
              onClick={() => {
                setModeSelected("FILL-FORM");
                setRole("client");
              }}
            >
              <Flex flexDir={"column"} rowGap={"16px"}>
                <Heading fontSize={"26px"} textAlign={"center"}>
                  Eroon tavaroistani
                </Heading>
                <Box margin={"0 auto"} width={"max-content"}>
                  <BoxOfStuffIcon width="42px" height="42px" />
                </Box>
              </Flex>
            </BorderDiv>
            <BorderDiv
              cursor={"pointer"}
              onClick={() => {
                toast(
                  customErrorToast(
                    "Currently not supported. For demo purposes create a client account."
                  ) as UseToastOptions
                );
                //setModeSelected("FILL-FORM");
                //setRole("driver");
              }}
            >
              <Flex flexDir={"column"} rowGap={"16px"}>
                <Heading fontSize={"26px"} textAlign={"center"}>
                  Tehdä kuljetuksia
                </Heading>
                <Box margin={"0 auto"} width={"max-content"}>
                  <TrolleyIcon width="42px" height="42px" />
                </Box>
              </Flex>
            </BorderDiv>
          </Flex>
        </Flex>
      </ContentStyles>
    );
  }

  return (
    <ContentStyles>
      <Box paddingTop={"50px"} paddingBottom={"50px"}>
        <Heading>Signup</Heading>
        <form onSubmit={submit}>
          <Flex flexDir={"column"} rowGap={"32px"} marginTop={"32px"}>
            <Box>
              {!address && (
                <FormLabel
                  textTransform={"capitalize"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  Osoite
                </FormLabel>
              )}
              {address ? (
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
                    <GreyText>{address.label}</GreyText>
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
                        onClick={() => setAddress(null)}
                      >
                        Muuta
                      </Text>
                    </Button>
                  </Flex>
                </Flex>
              ) : (
                <GooglePlacesAutocomplete
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                  selectProps={{
                    onChange: setAddress,
                  }}
                />
              )}
            </Box>

            <DividerWrapper verticalMargin={"0px"} />

            <GreyText>Yhteystiedot</GreyText>
            <TextInputLifeFeedback
              label={"Etunimi"}
              helpText={""}
              type={"text"}
              id={"firstName"}
              name={"firstName"}
              autocomplete={"given-name"}
              validateFunction={() => true}
              errorText={"Vaadittu tieto"}
            ></TextInputLifeFeedback>

            <TextInputLifeFeedback
              label={"Sukunimi"}
              helpText={""}
              type={"text"}
              id={"lastName"}
              name={"lastName"}
              autocomplete={"family-name"}
              validateFunction={() => true}
              errorText={"Vaadittu tieto"}
            ></TextInputLifeFeedback>

            <TextInputLifeFeedback
              label={"Puhelinnumero"}
              helpText={""}
              type={"text"}
              id={"phone-number"}
              name={"lastName"}
              autocomplete={"phone"}
              validateFunction={validatePhoneNumber}
              errorText={"Vaadittu tieto"}
            ></TextInputLifeFeedback>

            <DividerWrapper verticalMargin={"0px"} />

            <GreyText>Tunnistautumistiedot</GreyText>

            <TextInputLifeFeedback
              label={"email"}
              helpText={"Oikea sähköposti"}
              type={"text"}
              id={"email"}
              name={"email"}
              autocomplete={"email"}
              validateFunction={validateEmail}
              errorText={"Vaadittu tieto"}
            ></TextInputLifeFeedback>

            <TextInputLifeFeedback
              label={"Password"}
              helpText={"Vahva salasana"}
              type={"password"}
              id={"password"}
              name={"password"}
              autocomplete={"new-password"}
              validateFunction={validatePassword}
              errorText={"Salasanan täytyy olla vahvempi"}
            ></TextInputLifeFeedback>

            <Button
              width="250px"
              margin={"0 auto"}
              disabled={!formIsValid()}
              type={"submit"}
            >
              Signup
            </Button>

            <Link href={"/login"}>
              <BlueText textDecoration={"underline"} textAlign={"center"}>
                Already have an account?
              </BlueText>
            </Link>

            <Link href={"/get-recovery-link"}>
              <BlueText textDecoration={"underline"} textAlign={"center"}>
                Forgot password?
              </BlueText>
            </Link>
          </Flex>
        </form>
      </Box>
    </ContentStyles>
  );
};

export default Login;
