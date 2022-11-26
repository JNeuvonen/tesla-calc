import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { stringCapitalizeFirst } from "../utils/functions/general";
import ContentContainer from "./ContentContainer";
import SideMenu from "./Nav/Sidemenu/SideMenu";
import TopNav from "./Nav/TopNav";
import LoadingSpinner from "./Util/LoadingSpinner";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const path = router.asPath;
  const initAuthFetchDone = useAuth().initialFetchDone;
  const authIsFetching = useAuth().isFetching;
  const [nonNormalPaths] = useState([
    "login",
    "signup",
    "recover-password",
    "get-recovery-link",
  ]);

  const isStandardLayoutPath = () => {
    const filteredPaths = nonNormalPaths.filter((item) => path.includes(item));
    return filteredPaths.length === 0;
  };

  if (!initAuthFetchDone || authIsFetching) {
    return (
      <>
        {getPageTitle()}
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      {getPageTitle()}
      {isStandardLayoutPath() ? (
        <>
          <TopNav />
          <SideMenu />
          <ContentContainer>{children}</ContentContainer>
        </>
      ) : (
        <Box>{children}</Box>
      )}
    </>
  );
}

export const getPageTitle = () => {
  if (typeof window === "undefined") {
    return (
      <Head>
        <title>Authenticating</title>
      </Head>
    );
  }
  const path = window.location.href;
  const pathSplitted = path.split("/");
  const title = pathSplitted.length === 4 ? "Tesla-calc" : pathSplitted[3];

  return (
    <Head>
      <title>{stringCapitalizeFirst(title)}</title>
    </Head>
  );
};
