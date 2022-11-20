import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import { blueGradient, greyGradient } from "../chakra/gradients";
import BlueText from "../components/StyleWrappers/BlueText";
import TextInputLifeFeedback from "../components/TextInputLifeFeedback";

const Login = () => {
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const router = useRouter();

  const validateEmail = (input: string) => {
    const isValid = isEmail(input);
    setEmailIsValid(isValid);
    return isValid;
  };

  const validatePassword = (input: string) => {
    const isValid = isStrongPassword(input);
    setPasswordIsValid(isValid);
    return isValid;
  };

  return (
    <ContentStyles>
      <Heading>Signup</Heading>
      <form>
        <Flex flexDir={"column"} rowGap={"32px"} marginTop={"32px"}>
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

          <Button width="250px" margin={"0 auto"}>
            Signup
          </Button>
          <Button
            variant={"primaryInverse"}
            width={"250px"}
            margin={"0 auto"}
            onClick={() => router.push("/")}
          >
            Continue As Guest
          </Button>

          <Link href={"/login"}>
            <BlueText textDecoration={"underline"} textAlign={"center"}>
              Already have an account?
            </BlueText>
          </Link>
        </Flex>
      </form>
    </ContentStyles>
  );
};

export default Login;

// STYLING

export const ContentStyles = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Flex bgGradient={greyGradient()} width={"100%"} height={"100vh"}>
      <Box width={"80%"} height={"100vh"} bgGradient={blueGradient()}></Box>
      <Flex
        width={"50%"}
        height={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box>
          <Box minHeight={"500px"} width={"550px"}>
            {children}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};