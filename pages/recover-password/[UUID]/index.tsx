import {
  Box,
  Button,
  Flex,
  Heading,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import isStrongPassword from "validator/lib/isStrongPassword";
import { blueGradient, greyGradient } from "../../../chakra/gradients";
import BlueText from "../../../components/StyleWrappers/BlueText";
import TextInputLifeFeedback from "../../../components/TextInputLifeFeedback";
import { useAuth } from "../../../context/auth";
import { getRequest, postRequest } from "../../../services/util";
import { getInputFieldValById } from "../../../utils/functions/general";
import { customErrorToast, customSuccessToast } from "../../../utils/toasts";
import { ContentStyles } from "../../login";

const Login = ({
  data,
  status,
}: {
  data: User | undefined;
  status: number;
}) => {
  //STATE
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [repeatIsValid, setRepeatIsValid] = useState(false);

  //UTIL
  const router = useRouter();
  const toast = useToast();

  const validatePassword = (input: string) => {
    const isValid = isStrongPassword(input, {
      returnScore: true,
    });
    setPasswordIsValid(isValid > 20);
    return isValid > 20;
  };

  const validateRepeat = (input: string) => {
    const password = getInputFieldValById("password");

    const isValid = password === input;
    setRepeatIsValid(isValid);
    return isValid;
  };

  const formIsValid = () => {
    return passwordIsValid;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = getInputFieldValById("password");
    const repeat = getInputFieldValById("password-repeat");

    if (repeat && password) {
      const res = await postRequest({
        endpoint: "user/update-user-password/" + data?.UUID,
        payload: {
          newPassword: password,
        },
      });

      if (res && res.message === "OK") {
        toast(
          customSuccessToast("Password succesfully changed") as UseToastOptions
        );
        router.push("/login");
      } else {
        toast(customErrorToast(res?.message) as UseToastOptions);
      }
    }
  };

  if (status !== 200) {
    return <Box></Box>;
  }

  return (
    <ContentStyles>
      <Heading>Restore password</Heading>
      <form onSubmit={submit}>
        <Flex flexDir={"column"} rowGap={"32px"} marginTop={"32px"}>
          <TextInputLifeFeedback
            label={"password"}
            helpText={"Strong password"}
            type={"password"}
            id={"password"}
            name={"password"}
            autocomplete={"new-password"}
            validateFunction={validatePassword}
            errorText={"Strong password is required"}
          ></TextInputLifeFeedback>

          <TextInputLifeFeedback
            label={"Repeat Password"}
            helpText={"Passwords match"}
            type={"password"}
            id={"password-repeat"}
            name={"password"}
            autocomplete={"new-password"}
            validateFunction={validateRepeat}
            errorText={"Repeat password"}
          ></TextInputLifeFeedback>

          <Button
            width="250px"
            margin={"0 auto"}
            disabled={!formIsValid()}
            type={"submit"}
          >
            Submit
          </Button>
        </Flex>
      </form>

      <Flex flexDir={"column"} rowGap={"16px"} marginTop={"16px"}>
        <Link href={"/signup"}>
          <BlueText textDecoration={"underline"} textAlign={"center"}>
            Don't have an account?
          </BlueText>
        </Link>
        <Link href={"/signup"}>
          <BlueText textDecoration={"underline"} textAlign={"center"}>
            Login
          </BlueText>
        </Link>
      </Flex>
    </ContentStyles>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { UUID } = context.query;

    const res = await getRequest(
      process.env.NEXT_PUBLIC_BACKEND_HOST +
        "user/get-password-recovery-link/" +
        UUID
    );

    if (res && res.status === 200) {
      const parsedData = await res.json();

      return {
        props: {
          data: parsedData.user,
          status: 200,
        },
      };
    }
  } catch (err) {}

  return {
    props: {
      status: 400,
    },
  };
};
