import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/auth";
import {
  getPathLastItem,
  stringCapitalizeFirst,
} from "../utils/functions/general";
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
  const auth = useAuth();
  const [allowedPaths] = useState(["/", "/login", "/signup"]);

  const isStandardLayoutPath = () => {
    const filteredPaths = nonNormalPaths.filter((item) => path.includes(item));
    return filteredPaths.length === 0;
  };

  if (!initAuthFetchDone || authIsFetching) {
    return (
      <>
        {getPageTitle(router.asPath)}
        <LoadingSpinner />
      </>
    );
  }

  if (initAuthFetchDone && !auth.user) {
    if (!allowedPaths.includes(path)) {
      router.push("/");
    }
    return (
      <>
        {getPageTitle(router.asPath)}

        <Box>{children}</Box>
      </>
    );
  }

  return (
    <>
      {getPageTitle(router.asPath)}
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

export const getPageTitle = (asPath: string) => {
  if (typeof window === "undefined") {
    return (
      <Head>
        <title>Roudaaja</title>
      </Head>
    );
  }

  const title = asPath === "/" ? "Etusivu" : getPathLastItem(asPath);

  return (
    <Head>
      <title>{stringCapitalizeFirst(title)}</title>
    </Head>
  );
};
