import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import { blueGradient, greyGradient } from "../chakra/gradients";
import BlueText from "../components/StyleWrappers/BlueText";
import TextInputLifeFeedback from "../components/TextInputLifeFeedback";
import { useAuth } from "../context/auth";
import { getInputFieldValById } from "../utils/functions/general";
import useWindowDimensions from "../utils/hooks/windowDimensions";

const Login = () => {
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
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

    setPasswordIsValid(isValid > 20);
    return isValid > 20;
  };
  const formIsValid = () => {
    return emailIsValid && passwordIsValid;
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = getInputFieldValById("email");
    const password = getInputFieldValById("password");

    if (email && password) {
      auth.login({ email: email.toLowerCase(), password: password });
    }
  };

  return (
    <ContentStyles>
      <Box paddingBottom={"50px"} paddingTop={"50px"}>
        <Heading>Login</Heading>
        <form onSubmit={login}>
          <Flex flexDir={"column"} rowGap={"32px"} marginTop={"32px"}>
            <TextInputLifeFeedback
              label={"email"}
              helpText={"Valid email"}
              type={"text"}
              id={"email"}
              name={"email"}
              autocomplete={"email"}
              validateFunction={validateEmail}
              errorText={"Email is required"}
            ></TextInputLifeFeedback>

            <TextInputLifeFeedback
              label={"Password"}
              helpText={"Strong password"}
              type={"password"}
              id={"password"}
              name={"password"}
              autocomplete={"current-password"}
              validateFunction={validatePassword}
              errorText={"Password is required"}
            ></TextInputLifeFeedback>

            <Button
              width="250px"
              margin={"0 auto"}
              disabled={!formIsValid()}
              type="submit"
            >
              Login
            </Button>

            <Flex flexDir={"column"} rowGap={"16px"}>
              <Link href={"/signup"}>
                <BlueText textDecoration={"underline"} textAlign={"center"}>
                  Don't have an account?
                </BlueText>
              </Link>
              <Link href={"/get-recovery-link"}>
                <BlueText textDecoration={"underline"} textAlign={"center"}>
                  Forgot password?
                </BlueText>
              </Link>
            </Flex>
          </Flex>
        </form>
      </Box>
    </ContentStyles>
  );
};

export default Login;

// STYLING

export const ContentStyles = ({ children }: { children?: React.ReactNode }) => {
  const { width } = useWindowDimensions();
  return (
    <Flex bgGradient={greyGradient()} width={"100%"}>
      {width > 1000 && <Box width={"80%"} bgGradient={blueGradient()}></Box>}
      <Flex
        width={width > 1000 ? "50%" : "100%"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"100vh"}
      >
        <Box
          minHeight={"500px"}
          maxWidth={"550px"}
          width={"100%"}
          padding={"24px"}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};
