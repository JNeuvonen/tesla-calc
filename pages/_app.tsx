import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../chakra/theme";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/auth";
import { SidemenuProvider } from "../context/Sidemenu/sidemenu";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <SidemenuProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SidemenuProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}
