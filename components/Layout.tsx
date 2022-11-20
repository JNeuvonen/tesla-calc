import Head from "next/head";
import ContentContainer from "./ContentContainer";
import SideMenu from "./Nav/Sidemenu/SideMenu";
import TopNav from "./Nav/TopNav";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Page title</title>
      </Head>
      <TopNav />
      <SideMenu />
      <ContentContainer>{children}</ContentContainer>
    </>
  );
}
