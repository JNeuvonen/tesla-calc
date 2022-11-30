import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import BlueText from "../components/StyleWrappers/BlueText";
import BorderDiv from "../components/StyleWrappers/BorderDiv";
import TextInputLifeFeedback from "../components/TextInputLifeFeedback";
import { useAuth } from "../context/auth";
import { getInputFieldValById } from "../utils/functions/general";
import { BoxOfStuffIcon, TrolleyIcon } from "../utils/icons";
import { ContentStyles } from "./login";

const Login = () => {
  const [modeSelected, setModeSelected] = useState<"SELECT-ROLE" | "FILL-FORM">(
    "SELECT-ROLE"
  );

  const [role, setRole] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const router = useRouter();
  const auth = useAuth();

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
    return emailIsValid && passwordIsValid;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = getInputFieldValById("email");
    const password = getInputFieldValById("password");
    const address = getInputFieldValById("address");

    if (email && password && address) {
      auth.signup({ email, password, role, address });
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
                setModeSelected("FILL-FORM");
                setRole("client");
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
      <Heading>Signup</Heading>
      <form onSubmit={submit}>
        <Flex flexDir={"column"} rowGap={"32px"} marginTop={"32px"}>
          <TextInputLifeFeedback
            label={"address"}
            helpText={""}
            type={"text"}
            id={"address"}
            name={"address"}
            autocomplete={"address"}
            validateFunction={() => {
              return true;
            }}
            errorText={""}
          ></TextInputLifeFeedback>

          <TextInputLifeFeedback
            label={"email"}
            helpText={"Valid email"}
            type={"text"}
            id={"email"}
            name={"email"}
            autocomplete={"email"}
            validateFunction={validateEmail}
            errorText={"Valid email is required"}
          ></TextInputLifeFeedback>

          <TextInputLifeFeedback
            label={"Password"}
            helpText={"Strong password"}
            type={"password"}
            id={"password"}
            name={"password"}
            autocomplete={"new-password"}
            validateFunction={validatePassword}
            errorText={"Strong password is required"}
          ></TextInputLifeFeedback>

          <Button
            width="250px"
            margin={"0 auto"}
            disabled={!formIsValid()}
            type={"submit"}
          >
            Signup
          </Button>
          <Button
            variant={"primaryInverse"}
            width={"250px"}
            margin={"0 auto"}
            onClick={() => router.push("/")}
          >
            Jatka vieraana
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
    </ContentStyles>
  );
};

export default Login;
