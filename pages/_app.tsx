import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useEffect } from "react";
import { loginRequest } from "../services/user/login";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const asyncFunc = async () => {
      const res = await loginRequest({
        email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL as string,
        password: process.env.NEXT_PUBLIC_TEST_USER_PASSWORD as string,
      });
    };

    asyncFunc();
  }, []);
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
