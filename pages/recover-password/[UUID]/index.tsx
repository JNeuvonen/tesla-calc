import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import { blueGradient, greyGradient } from "../../../chakra/gradients";
import TextInputLifeFeedback from "../../../components/TextInputLifeFeedback";
import { useAuth } from "../../../context/auth";
import { getRequest } from "../../../services/util";
import { getInputFieldValById } from "../../../utils/functions/general";

const Login = ({ data, status }: { data: User; status: number }) => {
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
    setPasswordIsValid(isValid > 20);
    return isValid > 20;
  };

  const formIsValid = () => {
    return emailIsValid && passwordIsValid;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = getInputFieldValById("email");
    const password = getInputFieldValById("password");

    if (email && password) {
      auth.signup({ email, password });
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
            validateFunction={validateEmail}
            errorText={"Strong password is required"}
          ></TextInputLifeFeedback>

          <TextInputLifeFeedback
            label={"Repeat Password"}
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
            Submit
          </Button>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { UUID } = context.query;

    const res = await getRequest(
      process.env.NEXT_PUBLIC_BACKEND_HOST +
        "user/get-password-recovery-link/" +
        UUID
    );

    if (res.status === 200) {
      const parsedData = await res.json();

      return {
        props: {
          data: parsedData.user,
          status: 200,
        },
      };
    } else {
    }
  } catch (err) {}

  return {
    props: {
      status: 400,
    },
  };
};
