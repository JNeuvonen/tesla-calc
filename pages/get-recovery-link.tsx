import {
  Button,
  Flex,
  Heading,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import BlueText from "../components/StyleWrappers/BlueText";
import TextInputLifeFeedback from "../components/TextInputLifeFeedback";
import { postRequest } from "../services/util";
import { getInputFieldValById } from "../utils/functions/general";
import { customErrorToast, customSuccessToast } from "../utils/toasts";
import { ContentStyles } from "./login";

const Login = () => {
  //STATE
  const [emailIsValid, setEmailIsValid] = useState(false);

  //UTIL
  const router = useRouter();
  const toast = useToast();

  const validateEmail = (input: string) => {
    const isValid = isEmail(input);
    setEmailIsValid(isValid);
    return isValid;
  };

  const formIsValid = () => {
    return emailIsValid;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = getInputFieldValById("email");

    const res = await postRequest({
      endpoint: "user/forgot-password",
      payload: {
        email,
      },
    });

    if (res && res.message === "OK") {
      toast(
        customSuccessToast("Password recovery link sent") as UseToastOptions
      );
    } else {
      if (res?.message) {
        toast(customErrorToast(res.message) as UseToastOptions);
      }
    }
  };

  return (
    <ContentStyles>
      <Heading>Recover password</Heading>
      <form onSubmit={submit}>
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

          <Button
            width="250px"
            margin={"0 auto"}
            disabled={!formIsValid()}
            type="submit"
          >
            Submit
          </Button>
          <Button
            variant={"primaryInverse"}
            width={"250px"}
            margin={"0 auto"}
            onClick={() => router.push("/")}
          >
            Continue As Guest
          </Button>

          <Flex flexDir={"column"} rowGap={"16px"}>
            <Link href={"/signup"}>
              <BlueText textDecoration={"underline"} textAlign={"center"}>
                Don't have an account?
              </BlueText>
            </Link>
            <Link href={"/login"}>
              <BlueText textDecoration={"underline"} textAlign={"center"}>
                Login?
              </BlueText>
            </Link>
          </Flex>
        </Flex>
      </form>
    </ContentStyles>
  );
};

export default Login;
